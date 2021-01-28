/* eslint-disable max-lines */
import './index.scss';
import * as React from 'react';
import {
  FiCopy,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiEdit,
  FiEye,
  FiFilePlus,
  FiGitMerge,
  FiLink,
  FiMaximize2,
  FiPlay,
  FiSave,
  FiSend,
  FiX,
} from 'react-icons/fi';
import { OperationItem } from './OperationItem';
import { hotkeyEvents, HotKeyEventTypes, isMacOS, noop, toggleFullScreen, withMessage } from 'utils';
import { preview, save } from './actions';
import { observer } from 'mobx-react';
import { editStore } from 'states';
import { EditorResize } from './Resize';

const unImplemented = withMessage(noop, '该功能开发中', 'warn');

@observer
export class OperationBar extends React.Component {
  componentDidMount() {
    hotkeyEvents.only(HotKeyEventTypes.SAVE, save);
    hotkeyEvents.only(
      HotKeyEventTypes.TOGGLE_PREVIEW,
      withMessage(editStore.togglePreviewMode, () => (editStore.previewMode ? '切换编辑模式' : '切换预览模式')),
    );
    hotkeyEvents.only(HotKeyEventTypes.TOGGLE_FULLSCREEN, withMessage(toggleFullScreen, '切换全屏'));
  }

  renderCenter = () => {
    // TODO
    const hotKeyPrefix = isMacOS() ? 'command' : 'ctrl';
    const { previewMode } = editStore;

    const isUserValid = true;
    const owner = 'admin';
    const debugPort = undefined;
    const isTemplate = false;
    return (
      <div className="operation_bar center">
        <OperationItem title="undo" icon={FiCornerUpLeft} action={unImplemented} />
        <OperationItem title="redo" icon={FiCornerUpRight} action={unImplemented} />
        <OperationItem title="清除" icon={FiX} action={unImplemented} />
        <span className="operation_black" />

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
          title={debugPort ? 'Debug 模式不支持存为模板' : '存为模板'}
          icon={FiFilePlus}
          action={unImplemented}
          disabled={!!debugPort}
        />
        <OperationItem
          title={debugPort ? 'Debug 模式不支持历史管理' : '历史管理'}
          icon={FiGitMerge}
          action={unImplemented}
          disabled={!!debugPort}
        />
        <span className="operation_black" />

        <OperationItem title="预览" icon={FiPlay} action={preview} />
        <OperationItem
          disabled={isTemplate || !isUserValid || !!debugPort}
          title={
            isTemplate || !!debugPort ? (
              `${debugPort ? 'Debug 模式' : '模板'}不支持发布`
            ) : isUserValid ? (
              '发布'
            ) : (
              <p>
                没有发布权限
                <br />
                （由 {owner} 创建）
              </p>
            )
          }
          icon={FiSend}
          action={unImplemented}
        />
        <OperationItem title="查看链接" icon={FiLink} action={unImplemented} />
      </div>
    );
  };

  renderRight = () => {
    return (
      <div className="operation_bar right">
        <EditorResize />
      </div>
    );
  };

  render() {
    return (
      <>
        {this.renderCenter()}
        {this.renderRight()}
      </>
    );
  }
}
