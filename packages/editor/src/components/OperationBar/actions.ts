import { generateDSL } from '../../utils/dsl';

export function save() {
  const dsl = generateDSL();
  const result = JSON.stringify(dsl);
  console.log(dsl, result);
  localStorage.setItem('dsl', result);
}
