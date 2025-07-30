import * as clackPrompts from '@winner-fed/clack-prompts';
import {
  BaseGenerator,
  chalk,
  execa,
  fsExtra,
  getGitInfo,
  logger,
  pkgUp,
  tryPaths,
  yParser,
} from '@winner-fed/utils';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { ERegistry, unpackTemplate, type WinTemplate } from './template';

const devCommands = {
  pnpm: 'pnpm dev',
  yarn: 'yarn dev',
  npm: 'npm run dev',
  bun: 'bun run dev',
} as const;

/**
 * 转换字符串（中划线转换为小驼峰）
 * @param str
 * @returns {*}
 */
function parseStr(str: string) {
  return str.replace(/-(\w)/g, function (_$0, $1) {
    return $1.toUpperCase();
  });
}

/**
 * 生成一个用不重复的ID
 */
function getUUID() {
  return Number(Math.random().toString().substr(2)).toString(36);
}

function generateOnlyContainer(str: string) {
  return `${parseStr(str)}${getUUID()}`;
}

interface ITemplateArgs {
  template?: WinTemplate;
}

interface IArgs extends yParser.Arguments, ITemplateArgs {
  default?: boolean;
  git?: boolean;
  install?: boolean;
}

interface IContext {
  projectRoot: string;
  inMonorepo: boolean;
  target: string;
}

interface ITemplatePluginParams {
  pluginName?: string;
}

interface ITemplateParams extends ITemplatePluginParams {
  version: string;
  // 项目名称
  projectName: string;
  // 容器挂载id
  appContainerName: string;
  npmClient: ENpmClient | string;
  registry: string;
  author: string;
  email: string;
  withHusky: boolean;
  extraNpmrc: string;
}

enum ENpmClient {
  npm = 'npm',
  yarn = 'yarn',
  pnpm = 'pnpm',
}

enum ETemplate {
  app = 'app',
  pc = 'pc',
  plugin = 'plugin',
  sample = 'sample',
}

export interface IDefaultData extends ITemplateParams {
  appTemplate?: ETemplate;
}

const pkg = require('../package');
const DEFAULT_DATA = {
  pluginName: 'winjs-plugin-demo',
  projectName: 'winjs-template',
  email: 'i@domain.com',
  author: 'winjs',
  appContainerName: 'root',
  version: pkg.version,
  npmClient: ENpmClient.pnpm,
  registry: ERegistry.npm,
  withHusky: false,
  extraNpmrc: '',
  appTemplate: ETemplate.app,
} satisfies IDefaultData;

interface IGeneratorOpts {
  cwd: string;
  args: IArgs;
  defaultData?: IDefaultData;
}

export default async ({
  cwd,
  args,
  defaultData = DEFAULT_DATA,
}: IGeneratorOpts) => {
  let [name] = args._;
  let npmClient = ENpmClient.pnpm as string;
  let registry = ERegistry.npm as string;

  let appTemplate = defaultData?.appTemplate || ETemplate.app;
  const { username, email } = await getGitInfo();
  const author = email && username ? `${username} <${email}>` : '';

  // plugin params
  let pluginName = `winjs-plugin-${name || 'demo'}`;
  // project name
  let projectName = `winjs-template-${name || 'demo'}`;
  // app 容器name
  const appContainerName = generateOnlyContainer(projectName);

  let target = name ? join(cwd, name) : cwd;

  const { isCancel, text, select, intro, outro, box, taskLog } = clackPrompts;
  const exitPrompt = () => {
    outro(chalk.red('Exit create-win'));
    process.exit(1);
  };

  const setName = async () => {
    name = (await text({
      message: "What's the target folder name?",
      initialValue: name || 'my-app',
      validate: (value: string) => {
        if (!value.length) {
          return 'Please input project name';
        }
        if (value != '.' && fsExtra.existsSync(join(cwd, value))) {
          return `Folder ${value} already exists`;
        }
      },
    })) as string;
  };

  const selectAppTemplate = async () => {
    appTemplate = (await select({
      message: 'Pick WinJS App Template',
      options: [
        { label: 'Simple App', value: ETemplate.sample },
        {
          label: 'PC Web',
          value: ETemplate.pc,
          hint: 'for pc web',
        },
        { label: 'H5 App', value: ETemplate.app },
        {
          label: 'WinJS Plugin',
          value: ETemplate.plugin,
          hint: 'for plugin development',
        },
      ],
      initialValue: ETemplate.sample,
    })) as ETemplate;
  };
  const selectNpmClient = async () => {
    npmClient = (await select({
      message: 'Pick Npm Client',
      options: [
        { label: ENpmClient.npm, value: ENpmClient.npm },
        { label: ENpmClient.yarn, value: ENpmClient.yarn, hint: 'recommended' },
        { label: ENpmClient.pnpm, value: ENpmClient.pnpm },
      ],
      initialValue: ENpmClient.yarn,
    })) as ENpmClient;
  };

  const selectRegistry = async () => {
    registry = (await select({
      message: 'Pick Npm Registry',
      options: [
        {
          label: 'npm',
          value: ERegistry.npm,
        },
        {
          label: 'taobao',
          value: ERegistry.taobao,
          hint: 'recommended for China',
        },
      ],
      initialValue: ERegistry.taobao,
    })) as ERegistry;
  };

  const internalTemplatePrompts = async () => {
    intro('Creating a new WinJS project...');

    await setName();
    if (isCancel(name)) {
      exitPrompt();
    }

    target = join(cwd, name);

    await selectAppTemplate();
    if (isCancel(appTemplate)) {
      exitPrompt();
    }

    await selectNpmClient();
    if (isCancel(npmClient)) {
      exitPrompt();
    }

    await selectRegistry();
    if (isCancel(registry)) {
      exitPrompt();
    }

    // plugin extra questions
    const isPlugin = appTemplate === ETemplate.plugin;
    if (isPlugin) {
      pluginName = (await text({
        message: `What's the plugin name?`,
        placeholder: pluginName,
        validate: (value) => {
          if (!value?.length) {
            return 'Please input plugin name';
          }
        },
      })) as string;
      if (isCancel(pluginName)) {
        exitPrompt();
      }
    }
  };

  // --default
  const useDefaultData = !!args.default;
  // --template
  const useExternalTemplate = !!args.template;

  switch (true) {
    case useExternalTemplate:
      await selectNpmClient();
      if (isCancel(npmClient)) {
        exitPrompt();
      }
      await selectRegistry();
      if (isCancel(registry)) {
        exitPrompt();
      }

      await unpackTemplate({
        template: args.template!,
        dest: target,
        registry,
      });
      break;
    default:
      if (!useDefaultData) {
        await internalTemplatePrompts();
      }
  }

  const version = pkg.version;

  // detect monorepo
  const monorepoRoot = await detectMonorepoRoot({ target });
  const inMonorepo = !!monorepoRoot;
  const projectRoot = inMonorepo ? monorepoRoot : target;

  // git
  const shouldInitGit = args.git !== false;
  // now husky is not supported in monorepo
  const withHusky = shouldInitGit && !inMonorepo;

  // pnpm
  let pnpmExtraNpmrc: string = '';
  const isPnpm = npmClient === ENpmClient.pnpm;
  let pnpmMajorVersion: number | undefined;
  if (isPnpm) {
    pnpmMajorVersion = await getPnpmMajorVersion();
    if (pnpmMajorVersion === 7) {
      // suppress pnpm v7 warning ( 7.0.0 < pnpm < 7.13.5 )
      // https://pnpm.io/npmrc#strict-peer-dependencies
      pnpmExtraNpmrc = `strict-peer-dependencies=false`;
    }
  }

  const injectInternalTemplateFiles = async () => {
    const generator = new BaseGenerator({
      path: join(__dirname, '..', 'templates', appTemplate),
      target,
      slient: true,
      data: useDefaultData
        ? defaultData
        : ({
            version: version.includes('-canary.') ? version : `^${version}`,
            npmClient,
            registry,
            author,
            email,
            withHusky,
            extraNpmrc: isPnpm ? pnpmExtraNpmrc : '',
            pluginName,
            projectName,
            appContainerName,
          } satisfies ITemplateParams),
    });
    await generator.run();
  };
  if (!useExternalTemplate) {
    await injectInternalTemplateFiles();
  }

  const context: IContext = {
    inMonorepo,
    target,
    projectRoot,
  };

  if (!withHusky) {
    await removeHusky(context);
  }

  if (inMonorepo) {
    // monorepo should move .npmrc to root
    await moveNpmrc(context);
  }

  // init git
  if (shouldInitGit) {
    await initGit(context);
  } else {
    logger.info(`Skip Git init`);
  }

  // install deps
  const isPnpm8 = pnpmMajorVersion === 8;
  if (!useDefaultData && args.install !== false) {
    const installTask = taskLog(`Installing dependencies with ${npmClient}...`);
    if (isPnpm8) {
      await installWithPnpm8(target);
    } else {
      try {
        await execute(npmClient, ['install'], {
          cwd: target,
          onData: (data) => {
            installTask.text = data;
          },
        });
      } catch (error) {
        installTask.fail(`Failed to install dependencies with ${npmClient}`);
        throw error;
      }
    }
    installTask.success(`Installed dependencies with ${npmClient}`);
  } else {
    logger.info(`Skip install deps`);
    if (isPnpm8) {
      logger.warn(
        chalk.yellow(
          `You current using pnpm v8, it will install minimal version of dependencies`,
        ),
      );
      logger.warn(
        chalk.green(
          `Recommended that you run ${chalk.bold.cyan(
            'pnpm up -L',
          )} to install latest version of dependencies`,
        ),
      );
    }
  }

  // 为 .husky/pre-commit .husky/commit-msg 赋权限
  // https://github.com/cklwblove/blog/issues/127
  if (existsSync(join(target, '.husky/pre-commit'))) {
    if (process.platform !== 'win32') {
      execa.execaCommandSync(`chmod +x ${join(target, '.husky/pre-commit')}`);
      logger.info(`Chmod ${join(target, '.husky/pre-commit')} successful`);
    }
  }
  if (existsSync(join(target, '.husky/commit-msg'))) {
    if (process.platform !== 'win32') {
      execa.execaCommandSync(`chmod +x ${join(target, '.husky/commit-msg')}`);
      logger.info(`Chmod ${join(target, '.husky/commit-msg')} successful`);
    }
  }

  box(
    `
1: ${chalk.bold(chalk.cyan(`cd ${target}`))}
2: ${chalk.bold(chalk.cyan(devCommands[npmClient as keyof typeof devCommands]))}

To close the dev server, hit ${chalk.bold(chalk.cyan('Ctrl+C'))}
    `.trim(),
    'Next Steps',
  );

  outro(chalk.green(`Create success!`));
};

async function detectMonorepoRoot(opts: {
  target: string;
}): Promise<string | null> {
  const { target } = opts;
  const rootPkg = await pkgUp.pkgUp({ cwd: dirname(target) });
  if (!rootPkg) {
    return null;
  }
  const rootDir = dirname(rootPkg);
  if (
    tryPaths([
      join(rootDir, 'lerna.json'),
      join(rootDir, 'pnpm-workspace.yaml'),
    ])
  ) {
    return rootDir;
  }
  return null;
}

async function moveNpmrc(opts: IContext) {
  const { target, projectRoot } = opts;
  const sourceNpmrc = join(target, './.npmrc');
  const targetNpmrc = join(projectRoot, './.npmrc');
  if (!existsSync(targetNpmrc)) {
    await fsExtra.copyFile(sourceNpmrc, targetNpmrc);
  }
  await fsExtra.remove(sourceNpmrc);
}

async function initGit(opts: IContext) {
  const { projectRoot } = opts;
  const isGit = existsSync(join(projectRoot, '.git'));
  if (isGit) return;
  try {
    await execa.execa('git', ['init'], { cwd: projectRoot });
  } catch {
    logger.error(`Initial the git repo failed`);
  }
}

async function removeHusky(opts: IContext) {
  const dir = join(opts.target, './.husky');
  if (existsSync(dir)) {
    await fsExtra.remove(dir);
  }
}

// pnpm v8 will install minimal version of the dependencies
// so we upgrade all deps to the latest version
// https://pnpm.io/npmrc#resolution-mode
async function installWithPnpm8(cwd: string) {
  await execa.execa('pnpm', ['up', '-L'], { cwd, stdio: 'inherit' });
}

async function getPnpmMajorVersion() {
  try {
    const { stdout } = await execa.execa('pnpm', ['--version']);
    return parseInt(stdout.trim().split('.')[0], 10);
  } catch (e) {
    throw new Error('Please install pnpm first', { cause: e });
  }
}

async function execute(
  cmd: string,
  args: string[],
  options: { cwd: string; onData: (data: string) => void },
) {
  const child = execa.execa(cmd, args, {
    stdio: 'pipe',
    cwd: options.cwd,
  });
  return new Promise((resolve, reject) => {
    child.stdout?.on('data', (data) => {
      options.onData(data);
    });
    child.stderr?.on('data', (data) => {
      options.onData(data);
    });
    child.on('close', (code) => {
      resolve(code);
    });
    child.on('error', (error) => {
      reject(error);
    });
  });
}
