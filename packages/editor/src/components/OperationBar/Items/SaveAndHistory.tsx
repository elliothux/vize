import * as React from 'react';
import { useEffect } from 'react';
import { FiCopy, FiFilePlus, FiGitMerge, FiSave } from 'react-icons/fi';
import { OperationItem } from './OperationItem';
import { editStore } from 'states';
import { generateDSL, hotkeyEvents, HotKeyEventTypes, isDebugMode, isMacOS, promiseWrapper } from 'utils';
import { observer } from 'mobx-react';
import { message } from 'antd';
import { savePageHistory } from 'api';
import { unImplemented } from './utils';

function ISaveAndHistory() {
  const { debugPorts } = editStore;
  const hotKeyPrefix = isMacOS() ? 'command' : 'ctrl';
  // TODO
  const isUserValid = true;
  const owner = 'admin';

  useEffect(() => {
    hotkeyEvents.only(HotKeyEventTypes.SAVE, save);
  }, []);

  return (
    <>
      <OperationItem
        title={
          isUserValid ? (
            <>
              <p>保存</p>
              <p className="desc">({hotKeyPrefix} + s)</p>
            </>
          ) : (
            <p>
              没有保存权限
              <br />
              （由 {owner} 创建）
            </p>
          )
        }
        icon={FiSave}
        action={save}
        disabled={!isUserValid}
      />
      <OperationItem title="复制" icon={FiCopy} action={unImplemented} />
      <OperationItem
        title={debugPorts ? 'Debug 模式不支持存为模板' : '存为模板'}
        icon={FiFilePlus}
        action={unImplemented}
        disabled={!!debugPorts}
      />
      <OperationItem
        title={debugPorts ? 'Debug 模式不支持历史管理' : '历史管理'}
        icon={FiGitMerge}
        action={unImplemented}
        disabled={!!debugPorts}
      />
      <span className="operation_black" />
    </>
  );
}

export const SaveAndHistory = observer(ISaveAndHistory);

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

// TODO: Remove
(window as any)['clearDSL'] = () => {
  localStorage.removeItem('dsl');
  console.log('clearDSL success');
};
