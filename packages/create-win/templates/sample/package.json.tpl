{
  "name": "{{{ projectName }}}",
  "version": "1.0.0",
  "buildVersion": "V202101-00-000",
  "private": true,
  "author": "{{{ author }}}",
  "scripts": {
    "dev": "win dev",
    "build": "win build",
    "postinstall": "win setup",
    "setup": "win setup",
    "start": "npm run dev",
    "preview": "win preview"
  },
  "dependencies": {
    "@winner-fed/winjs": "*"
  },
  "devDependencies": {
    "typescript": "^5.0.3"
  }
}
