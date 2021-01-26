export function getMaterialsIdentityName(libName: string, name: string) {
  if (!libName.trim()) {
    return name;
  }
  return `${libName}_${name}`.toLocaleLowerCase();
}
