import { logger } from '@winner-fed/utils';
import { existsSync } from 'fs';
import getGitRepoInfo from 'git-repo-info';
import { join } from 'path';
import { rimraf } from 'rimraf';
import 'zx/globals';
import { PATHS } from './.internal/constants';
import { assert, eachPkg, getPkgs } from './.internal/utils';

(async () => {
  const { branch } = getGitRepoInfo();
  logger.info(`branch: ${branch}`);
  const pkgs = getPkgs();
  logger.info(`pkgs: ${pkgs.join(', ')}`);

  // check git status
  logger.event('check git status');
  const isGitClean = (await $`git status --porcelain`).stdout.trim().length;
  assert(!isGitClean, 'git status is not clean');

  // check git remote update
  logger.event('check git remote update');
  await $`git fetch`;
  const gitStatus = (await $`git status --short --branch`).stdout.trim();
  assert(!gitStatus.includes('behind'), `git status is behind remote`);

  // check package changed
  logger.event('check package changed');
  const changed = (await $`lerna changed --loglevel error`).stdout.trim();
  assert(changed, `no package is changed`);

  // check package.json
  logger.event('check package.json info');
  await $`npm run check:packageFiles`;

  // clean
  logger.event('clean');
  eachPkg(pkgs, ({ dir, name }) => {
    logger.info(`clean dist of ${name}`);
    rimraf.sync(join(dir, 'dist'));
  });

  // build packages
  logger.event('build packages');
  await $`npm run build:release`;

  // bump version
  logger.event('bump version');
  await $`lerna version --exact --no-commit-hooks --no-git-tag-version --no-push --loglevel error`;
  const version = require(PATHS.LERNA_CONFIG).version;
  let tag = 'latest';
  if (
    version.includes('-alpha.') ||
    version.includes('-beta.') ||
    version.includes('-rc.')
  ) {
    tag = 'next';
  }
  if (version.includes('-canary.')) tag = 'canary';

  // update example versions
  logger.event('update example versions');
  const examplesDir = PATHS.EXAMPLES;
  const examples = fs.readdirSync(examplesDir).filter((dir) => {
    return (
      !dir.startsWith('.') && existsSync(join(examplesDir, dir, 'package.json'))
    );
  });
  examples.forEach((example) => {
    const pkg = require(join(examplesDir, example, 'package.json'));
    pkg.scripts ||= {};
    pkg.scripts['start'] = 'npm run dev';
    delete pkg.version;
    fs.writeFileSync(
      join(examplesDir, example, 'package.json'),
      `${JSON.stringify(pkg, null, 2)}\n`,
    );
  });

  // update pnpm lockfile
  logger.event('update pnpm lockfile');
  $.verbose = false;
  await $`pnpm run install:dep`;
  $.verbose = true;

  // commit
  logger.event('commit');
  await $`git commit --all --message "release: ${version}"`;

  // git tag
  if (tag !== 'canary') {
    logger.event('git tag');
    await $`git tag v${version}`;
  }

  // git push
  logger.event('git push');
  await $`git push origin ${branch} --tags`;

  // pnpm publish
  logger.event('pnpm publish');
  $.verbose = false;
  const innerPkgs = pkgs.filter((pkg) => !['win'].includes(pkg));

  await Promise.all(
    innerPkgs.map(async (pkg) => {
      await $`cd packages/${pkg} && pnpm publish --no-git-checks --tag ${tag} ${otpArg}`;
      logger.info(`+ ${pkg}`);
    }),
  );

  $.verbose = true;
})();

// function releaseByGithub(releaseNotes: string, version: string) {
//   const releaseParams = {
//     tag: version,
//     title: `v${version}`,
//     body: releaseNotes,
//     prerelease: false,
//   };
//   open(
//     `https://github.com/umijs/umi/releases/new?${qs.stringify(releaseParams)}`,
//   );
// }

// function generateChangelog(releaseNotes: string) {
//   const CHANGELOG_PATH = join(PATHS.ROOT, 'TMP_CHANGELOG.md');
//   const hasFile = fs.existsSync(CHANGELOG_PATH);
//   let newStr = '';
//   if (hasFile) {
//     const str = fs.readFileSync(CHANGELOG_PATH, 'utf-8');
//     const arr = str.split('# win changelog');
//     newStr = `# win changelog\n\n${releaseNotes}${arr[1]}`;
//   } else {
//     newStr = `# win changelog\n\n${releaseNotes}`;
//   }
//   fs.writeFileSync(CHANGELOG_PATH, newStr);
// }
