export function varsToObject(vars: string[]) {
  return `{ ${vars.join(', ')} }`;
}

export function stringify(i: any) {
  return JSON.stringify(i, null, 2);
}
