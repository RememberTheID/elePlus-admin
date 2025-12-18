import pkg from '../../package.json';
export const sysSetting = {
  STORAGE_TYPE: localStorage,
  STORAGE_KEY: `REM_ADMIN_${pkg.version}`
}