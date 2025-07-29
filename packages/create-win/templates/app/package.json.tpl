{
  "name": "{{{ projectName }}}",
  "version": "1.0.0",
  "buildVersion": "V202101-00-000",
  "private": true,
  "author": "{{{ author }}}",
  "scripts": {
    "dev": "win dev",
    "build": "cross-env WIN_APP_ENV=production win build",
    "lint": "win lint",
    "f2elint-scan": "f2elint scan --include src",
    "f2elint-fix": "f2elint fix --include src",
    "format": "prettier --write \"src/**/*.{js,jsx,json,ts,tsx,css,less,scss,vue,html,md}\" \"package.json\"",
    "postinstall": "win setup",
    "prepare": "husky install",
    "setup": "win setup",
    "start": "npm run dev",
    "preview": "win preview"
  },
  "dependencies": {
    "@winner-fed/cloud-utils": "^2.0.1",
    "@winner-fed/magicless": "*",
    "@winner-fed/winjs": "{{{ version }}}"
  },
  "devDependencies": {
    "@winner-fed/plugin-request": "^1.0.1",
    "@winner-fed/plugin-wconsole": "^1.0.0",
    "@winner-fed/f2elint": "^3.0.0",
    "cross-env": "^7.0.3",
    "husky": "8.0.3",
    "lint-staged": "13.2.3",
    "typescript": "^5.0.3"
  }
}
