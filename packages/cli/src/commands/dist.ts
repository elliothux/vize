import { getLibPaths } from '../utils';
import { getLibConfig } from '../config';
import { Builder } from '../builder';

export async function dist() {
  const root = process.cwd();
  const paths = getLibPaths(root);
  const config = getLibConfig(paths);

  const builder = new Builder({
    libPaths: paths,
    libConfig: config,
    idProd: true,
  });
  return builder.dist();
}
