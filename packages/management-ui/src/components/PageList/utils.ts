import { PageRecord } from 'types';
import { bizStore, materialsStore } from 'state';
import { message } from 'antd';

export function goToEditor({ key, biz: { id: bizId }, container: { name } }: PageRecord) {
  const libs = materialsStore
    .getMaterialsByLibNames(bizStore.bizList?.find(i => i.id === bizId)?.materials)
    ?.map(i => i.libName)
    ?.join(',');
  if (!libs) {
    return message.error('未绑定物料库');
  }
  const url = `/editor?key=${key}&libs=${libs}&container=${name}`;
  return window.open(url, '_blank');
}
