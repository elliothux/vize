import { getLibPaths } from '../utils';
import { getLibConfig } from '../config';
import { Builder } from '../builder';

export async function dist() {
  const paths = getLibPaths();
  const config = getLibConfig(paths);

  const builder = new Builder({
    libPaths: paths,
    libConfig: config,
    idProd: true,
  });
  return builder.dist();
}
