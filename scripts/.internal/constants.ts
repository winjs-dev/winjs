import { join } from 'path';

const ROOT = join(__dirname, '../../');
export const PATHS = {
  ROOT,
  PACKAGES: join(ROOT, './packages'),
  LERNA_CONFIG: join(ROOT, './lerna.json'),
} as const;

export const SCRIPTS = {
  BUNDLE_DEPS: 'win-scripts bundleDeps',
  DEV: 'win-scripts father dev',
  BUILD: 'win-scripts father build',
  TEST_TURBO: 'win-scripts jest-turbo',
} as const;
