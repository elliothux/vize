import { generateDSL, isDebugMode, promiseWrapper } from 'utils';
import { previewPage, savePageHistory } from 'api';
import { message } from 'antd';
import { editStore } from 'states';

export async function save() {
  message.loading('保存中...');

  const dsl = generateDSL();
  if (isDebugMode()) {
    return setTimeout(() => {
      localStorage.setItem('dsl', JSON.stringify(dsl));
      message.destroy();
      message.success('保存成功');
    }, 0);
  }

  const [err] = await promiseWrapper(savePageHistory(dsl));
  message.destroy();
  err ? message.error('保存失败') : message.success('保存成功');
}

export async function preview() {
  const [err, result] = await previewPage(editStore.pageKey);
  debugger;
}
