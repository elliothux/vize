import { generateDSL } from '../../utils';

export function save() {
  const dsl = generateDSL();
  console.log(dsl, JSON.stringify(dsl));
}
