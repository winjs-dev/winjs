import { glob, lodash, logger } from '@winner-fed/utils';
import { isMatch } from 'matcher';
import 'zx/globals';
import { SCRIPTS } from './.internal/constants';
import { eachPkg, getPkgs } from './.internal/utils';

const COMMON_IGNORES = [
  // default included
  'bin',
  // deps
  'node_modules',
  // for test
  'fixtures',
  'examples',
  'scripts',
  // source
  'src',
  'bundles',
  // doc
  '*.md',
  // config files
  'tsconfig*.json',
  '*.config.js',
  'package.json',
  'typings.d.ts',
  // extra
  'devToolApp',
];

// check packages/*
let missingDetected = false;
eachPkg(getPkgs(), ({ pkgJson, dir, name, pkgPath }) => {
  /**
   * check `files` missing
   */
  const files = fs.readdirSync(dir).filter((f) => {
    return !isMatch(f, COMMON_IGNORES) && !f.startsWith('.');
  });
  const missingAddFiles = files.filter((f) => !isMatch(f, pkgJson.files));

  if (missingAddFiles.length > 0) {
    logger.error('Checking package:', name);
    logger.error(
      `  "${missingAddFiles.join(
        ', ',
      )}"  missing in the package.json files field`,
    );
    missingDetected = true;
  }

  /**
   * check jest `test` script exist
   */
  const testFiles = glob.sync(`${path.join(dir)}/src/**/*.test.ts`);
  const oldPkgJson = lodash.cloneDeep(pkgJson);
  if (testFiles.length) {
    pkgJson.scripts.test = SCRIPTS.TEST_TURBO;
  } else {
    delete pkgJson.scripts.test;
  }
  pkgJson.scripts['build:deps'] = SCRIPTS.BUNDLE_DEPS;
  if (!lodash.isEqual(oldPkgJson, pkgJson)) {
    fs.writeFileSync(pkgPath, `${JSON.stringify(pkgJson, null, 2)}\n`, 'utf-8');
  }
});
if (missingDetected) {
  process.exit(1);
} else {
  logger.ready(`Check packages files success`);
}
