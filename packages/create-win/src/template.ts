import { axios, chalk, fsExtra, logger } from '@winner-fed/utils';
import { x as unpack } from '@winner-fed/utils/compiled/tar';

export enum ERegistry {
  npm = 'https://registry.npmjs.com/',
  taobao = 'https://registry.npmmirror.com/',
  // 公司内网
  winner = 'http://artifactory.hundsun.com/artifactory/api/npm/winnerproject-npm-virtual/',
}

export type WinTemplate = `@winner-fed/${string}-template`;

interface IUnpackTemplateOpts {
  template: WinTemplate;
  dest: string;
  registry: ERegistry | string;
}

export const unpackTemplate = async (opts: IUnpackTemplateOpts) => {
  const { template, dest, registry } = opts;

  logger.info(
    `Init a new project with template ${chalk.blue(template)} from npm ...`,
  );

  const tryDownload = async (name: string) => {
    const url = await getNpmPkgTarUrl({ registry, name });
    if (!url) {
      return;
    }
    try {
      return await downloadTar({ dest, url });
    } catch (e) {
      throw new Error(`Download ${name} failed from ${registry}`, { cause: e });
    }
  };

  const nameList: string[] = [];

  const isStartWithWin = template.startsWith('@winner-fed/');
  if (template.endsWith('-template')) {
    // @winner-fed/electron-template
    if (isStartWithWin) {
      nameList.push(template);
    } else {
      // electron-template
      nameList.push(`@winner-fed/${template}`);
    }
  } else if (isStartWithWin) {
    // @winner-fed/electron
    nameList.push(`${template}-template`);
  } else {
    // electron
    nameList.push(`@winner-fed/${template}-template`);
  }

  for await (const name of nameList) {
    const success = await tryDownload(name);
    if (success) {
      logger.ready(`Init ${chalk.green(name)} success`);
      return success;
    }
  }

  // not found
  throw new Error(
    `Template ${nameList
      .map((i) => chalk.yellow(i))
      .join(', ')} not found from ${registry}`,
  );
};

async function getNpmPkgTarUrl(opts: { registry: string; name: string }) {
  const { registry, name } = opts;
  const nameWithoutScope = name.startsWith('@') ? name.split('/')[1] : name;
  const latestPkgInfoUrl = `${registry}${name}/latest`;
  let headers = {};
  const res = await axios.get(latestPkgInfoUrl, {
    headers: {
      ...headers,
    },
    validateStatus: () => true,
  });
  const latestVersion = res?.data?.version;
  if (!latestVersion) {
    return;
  }
  return `${registry}${name}/-/${nameWithoutScope}-${latestVersion}.tgz`;
}

async function downloadTar(opts: { dest: string; url: string }) {
  const { dest, url } = opts;
  let headers = {};
  return new Promise<string>(async (resolve, reject) => {
    try {
      const res = await axios.get(url, {
        headers: {
          ...headers,
        },
        responseType: 'stream',
      });
      fsExtra.mkdirpSync(dest);
      res.data.pipe(
        unpack({
          C: dest,
          strip: 1,
        }),
      );
      resolve(dest);
    } catch (e) {
      if (fsExtra.existsSync(dest)) {
        fsExtra.removeSync(dest);
      }
      reject(e);
    }
  });
}
