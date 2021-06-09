import * as React from 'react';
import { observer } from 'mobx-react';
import { useCallback, useEffect } from 'react';
import { message } from 'antd';
import { FiCornerUpLeft, FiCornerUpRight, FiX } from 'react-icons/fi';
import { Trans, useTranslation } from 'react-i18next';
import { unImplemented } from 'utils';
import { hotkeyEvents, HotKeyEventTypes } from 'libs';
import { timeTraveler } from 'libs/history';
import { OperationItem } from './OperationItem';
import { hotKeyPrefix } from './utils';

function IUndoAndClear() {
  const { t } = useTranslation();
  const { canUndo, canRedo, undo: un, redo: re } = timeTraveler;

  const undo = useCallback(() => {
    if (!timeTraveler.canUndo) {
      return;
    }
    message.destroy();
    message.open({
      type: 'info',
      content: 'undo',
      icon: <FiCornerUpLeft />,
      duration: 1,
      className: 'undo-message',
    });
    un();
  }, []);

  const redo = useCallback(() => {
    if (!timeTraveler.canRedo) {
      return;
    }
    message.destroy();
    message.open({
      type: 'info',
      content: 'redo',
      icon: <FiCornerUpRight />,
      duration: 1,
      className: 'redo-message',
    });
    re();
  }, []);

  useEffect(() => {
    hotkeyEvents.only(HotKeyEventTypes.UNDO, undo);
    hotkeyEvents.only(HotKeyEventTypes.REDO, redo);
  }, []);

  return (
    <>
      <OperationItem
        title={
          <>
            <p>
              <Trans>undo</Trans>
            </p>
            <p className="desc">({hotKeyPrefix} + Z)</p>
          </>
        }
        icon={FiCornerUpLeft}
        action={undo}
        disabled={!canUndo}
      />
      <OperationItem
        title={
          <>
            <p>
              <Trans>redo</Trans>
            </p>
            <p className="desc">({hotKeyPrefix} + Shift + Z)</p>
          </>
        }
        icon={FiCornerUpRight}
        action={redo}
        disabled={!canRedo}
      />
      <OperationItem title={t('clear')} icon={FiX} action={unImplemented} />
      <span className="operation_black" />
    </>
  );
}

export const UndoAndClear = observer(IUndoAndClear);
