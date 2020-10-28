export function getMaterialsIdentityName(libName: string, name: string) {
  return `${libName}_${name}`.toLocaleLowerCase();
}
