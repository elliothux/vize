let data: object | null = null;

export function setPegasusData(pegasusData: object) {
  data = pegasusData;
}

export function getPegasusData(key: number, type: 'component' | 'plugin', isStyle = false): object | undefined {
  const name = `${type}_${isStyle ? 'style' : 'data'}_${key}`;
  return data?.[name];
}
