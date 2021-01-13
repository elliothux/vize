import { generateDSL, isDebugMode, promiseWrapper } from 'utils';
import { savePageHistory } from 'api';
import { message } from 'antd';

export async function save() {
  message.loading('保存中...');

  const dsl = generateDSL();
  if (isDebugMode()) {
    return setTimeout(() => {
      localStorage.setItem('dsl', JSON.stringify(dsl));
      message.success('保存成功');
    }, 0);
  }

  const [err] = await promiseWrapper(savePageHistory(dsl));
  message.destroy();
  err ? message.error('保存失败') : message.success('保存成功');
}
