import { PageRecord } from 'types';
import { bizStore, materialsStore } from 'state';
import { message } from 'antd';
import { i18n } from 'i18n';

export function goToEditor({ key, biz: { id: bizId }, container: { name } }: PageRecord) {
  const libs = materialsStore
    .getMaterialsByLibNames(bizStore.bizList?.find(i => i.id === bizId)?.materials)
    ?.map(i => i.libName)
    ?.join(',');
  if (!libs) {
    return message.error(i18n.t('No material library for this page'));
  }
  const url = `/editor?key=${key}&libs=${libs}&container=${name}`;
  return window.open(url, '_blank');
}

export function goToPlayground(lib: string, container: string) {
  const url = `/editor?playground=${lib}&container=${container}`;
  return window.open(url, '_blank');
}
