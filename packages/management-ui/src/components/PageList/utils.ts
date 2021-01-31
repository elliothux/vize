import { PageRecord } from 'types';
import { bizStore } from 'state';

export function goToEditor({ key, biz: { id: bizId }, container: { name } }: PageRecord) {
  const libs = bizStore.bizList
    ?.find(i => i.id === bizId)
    ?.materials?.map(i => i.libName)
    ?.join(',');
  if (!libs) {
    return null;
  }
  const url = `/editor?key=${key}&libs=${libs}&container=${name}`;
  return window.open(url, '_blank');
}
