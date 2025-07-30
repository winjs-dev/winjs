{
  "name": "{{{ pluginName }}}",
  "author": "{{{ author }}}",
  "version": "0.0.1",
  "main": "dist/cjs/index.js",
  "types": "dist/cjs/index.d.ts",
  "scripts": {
    "dev": "father dev",
    "build": "father build"
  },
  "keywords": [],
  "authors": {
    "name": "{{{ author }}}",
    "email": "{{{ email }}}"
  },
  "license": "MIT",
  "files": [
    "dist"
  ],
  "devDependencies": {
    "@winner-fed/winjs": "*",
    "father": "^4.1.8",
    "@types/node": "^18.15.11",
    "typescript": "^5.0.3"
  }
}
