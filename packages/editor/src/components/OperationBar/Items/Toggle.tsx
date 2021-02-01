import * as React from 'react';
import { useEffect } from 'react';
import { FiEdit, FiEye, FiMaximize2 } from 'react-icons/fi';
import { OperationItem } from './OperationItem';
import { editStore } from 'states';
import { hotkeyEvents, HotKeyEventTypes, isMacOS, toggleFullScreen, withMessage } from 'utils';
import { observer } from 'mobx-react';

function IToggle() {
  const { previewMode } = editStore;
  const hotKeyPrefix = isMacOS() ? 'command' : 'ctrl';

  useEffect(() => {
    hotkeyEvents.only(
      HotKeyEventTypes.TOGGLE_PREVIEW,
      withMessage(editStore.togglePreviewMode, () => (editStore.previewMode ? '切换编辑模式' : '切换预览模式')),
    );
    hotkeyEvents.only(HotKeyEventTypes.TOGGLE_FULLSCREEN, withMessage(toggleFullScreen, '切换全屏'));
  }, []);

  return (
    <>
      <OperationItem
        title={
          <>
            <p>{previewMode ? '切换到编辑模式' : '切换到预览模式'}</p>
            <p className="desc">({hotKeyPrefix} + p)</p>
          </>
        }
        icon={previewMode ? FiEdit : FiEye}
        action={editStore.togglePreviewMode}
      />
      <OperationItem
        title={
          <>
            <p>切换全屏</p>
            <p className="desc">({hotKeyPrefix} + f)</p>
          </>
        }
        icon={FiMaximize2}
        action={toggleFullScreen}
      />
      <span className="operation_black" />
    </>
  );
}

export const Toggle = observer(IToggle);
