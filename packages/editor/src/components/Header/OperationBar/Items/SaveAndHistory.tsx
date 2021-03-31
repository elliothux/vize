import * as React from 'react';
import { useEffect } from 'react';
import { FiCopy, FiFilePlus, FiGitMerge, FiSave } from 'react-icons/fi';
import { OperationItem } from './OperationItem';
import { editStore } from 'states';
import { generateDSL, hotkeyEvents, HotKeyEventTypes, isDebugMode, promiseWrapper } from 'utils';
import { observer } from 'mobx-react';
import { message } from 'antd';
import { savePageHistory } from 'api';
import { unImplemented, hotKeyPrefix } from './utils';
import { useTranslation, Trans } from 'react-i18next';
import { i18n } from 'i18n';

function ISaveAndHistory() {
  const { t } = useTranslation();
  const {
    debugPorts: [debugPort],
  } = editStore;
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
              <p>
                <Trans>save</Trans>
              </p>
              <p className="desc">({hotKeyPrefix} + S)</p>
            </>
          ) : (
            <p>
              {t("don't have permission to {{type}}", { type: 'save' })}
              <br />（{t('Create by {{owner}}', { owner })}）
            </p>
          )
        }
        icon={FiSave}
        action={save}
        disabled={!isUserValid}
      />
      <OperationItem title={t('copy')} icon={FiCopy} action={unImplemented} />
      <OperationItem
        title={
          debugPort ? t('{{type}} not allowed with DebugMode', { type: 'save as template' }) : t('save as template')
        }
        icon={FiFilePlus}
        action={unImplemented}
        disabled={!!debugPort}
      />
      <OperationItem
        title={debugPort ? t('{{type}} not allowed with DebugMode', { type: 'history manager' }) : t('history manager')}
        icon={FiGitMerge}
        action={unImplemented}
        disabled={!!debugPort}
      />
      <span className="operation_black" />
    </>
  );
}

export const SaveAndHistory = observer(ISaveAndHistory);

export async function save() {
  message.loading(`${i18n.t('saving')}...`);

  const dsl = generateDSL();
  console.log(dsl);
  if (isDebugMode()) {
    return setTimeout(() => {
      localStorage.setItem('dsl', JSON.stringify(dsl));
      message.destroy();
      message.success(i18n.t('saved'));
    }, 0);
  }

  const [err] = await promiseWrapper(savePageHistory(dsl));
  message.destroy();
  err ? message.error(i18n.t('failed to save')) : message.success(i18n.t('saved'));
}

(window as any)['clearDebugDSL'] = () => {
  localStorage.removeItem('dsl');
  console.log('Clear debug DSL success');
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};
