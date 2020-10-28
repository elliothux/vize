/* eslint-disable max-lines */
import './index.scss';
import * as React from 'react';
import {
  FiCornerUpLeft,
  FiCornerUpRight,
  FiEdit,
  FiEye,
  FiFilePlus,
  FiGitMerge,
  FiLink,
  FiMaximize2,
  FiPlay,
  FiCopy,
  FiSave,
  FiSend,
  FiX,
} from 'react-icons/fi';
import { Tooltip } from 'antd';
import { OperationItem } from './OperationItem';
import { noop } from 'utils';
import classNames from 'classnames';
import { ReactComponent as Column } from 'static/images/right-column-layout.svg';
import { save } from './actions';
import { observer } from 'mobx-react';
import { globalStore } from '../../states';

@observer
export class OperationBar extends React.Component {
  renderCenter = () => {
    // TODO
    const { previewMode } = globalStore;

    const isUserValid = true;
    const owner = 'admin';
    const debugPort = undefined;
    const isTemplate = false;
    return (
      <div className="operation_bar center">
        <OperationItem title="undo" icon={FiCornerUpLeft} action={noop} />
        <OperationItem title="redo" icon={FiCornerUpRight} action={noop} />
        <OperationItem title="清除" icon={FiX} action={noop} />
        <span className="operation_black" />
        <OperationItem
          title={previewMode ? '切换到编辑模式' : '切换到预览模式'}
          icon={previewMode ? FiEdit : FiEye}
          action={globalStore.togglePreviewMode}
        />
        <OperationItem title="全屏" icon={FiMaximize2} action={noop} />
        <span className="operation_black" />
        <OperationItem
          title={
            isUserValid ? (
              '保存'
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
        <OperationItem title="复制" icon={FiCopy} action={noop} />
        <OperationItem
          title={debugPort ? 'Debug 模式不支持存为模板' : '存为模板'}
          icon={FiFilePlus}
          action={noop}
          disabled={!!debugPort}
        />
        <OperationItem
          title={debugPort ? 'Debug 模式不支持历史管理' : '历史管理'}
          icon={FiGitMerge}
          action={noop}
          disabled={!!debugPort}
        />
        <span className="operation_black" />
        {/*<OperationItem*/}
        {/*  title={debugPort ? "Debug 模式不支持下载" : "下载页面 Bundle"}*/}
        {/*  icon={FiDownload}*/}
        {/*  action={noop}*/}
        {/*  disabled={!!debugPort}*/}
        {/*/>*/}
        <OperationItem title="预览" icon={FiPlay} action={noop} />
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
          action={noop}
        />
        <OperationItem title="查看发布过的页面" icon={FiLink} action={noop} />
      </div>
    );
  };

  renderRight = () => {
    const hideLeft = false;
    const hideRight = false;

    return (
      <div className="operation_bar right">
        <Tooltip title="收起左栏">
          <div className={classNames('hide_left', { activated: hideLeft })}>
            <Column />
          </div>
        </Tooltip>
        <Tooltip title="收起右栏">
          <div className={classNames('hide_right', { activated: hideRight })}>
            <Column />
          </div>
        </Tooltip>
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
