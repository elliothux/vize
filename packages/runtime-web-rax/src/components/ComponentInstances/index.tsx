import { createElement } from 'rax';
import { AppRenderProps } from '../AppRender/types';
import { ComponentItem } from '../ComponentItem';

export function ComponentInstances({
  global,
  meta,
  router,
  componentInstances,
}: Pick<AppRenderProps, 'global' | 'meta' | 'router' | 'componentInstances'>) {
  return (
    <>
      {componentInstances.map(instance => (
        <ComponentItem key={instance.key} instance={instance} global={global} meta={meta} router={router} />
      ))}
    </>
  );
}
