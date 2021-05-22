export function getMaterialsIdentityName(libName: string, name: string) {
  if (!libName.trim()) {
    return name;
  }
  return `${libName.toLocaleLowerCase()}_${name}`;
}
