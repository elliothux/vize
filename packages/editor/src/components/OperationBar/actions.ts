import { generateDSL, promiseWrapper } from 'utils';
import { savePage } from 'api';

export async function save() {
  const dsl = generateDSL();
  localStorage.setItem('dsl', JSON.stringify(dsl));

  const [err, result] = await promiseWrapper(savePage(dsl));
  console.log(err, result);
}
