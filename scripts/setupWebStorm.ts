import { eachPkg, getPkgs, setExcludeFolder } from './.internal/utils';

const cwd = process.cwd();
eachPkg(getPkgs(), ({ name }) => {
  setExcludeFolder({ pkg: name, cwd });
});
