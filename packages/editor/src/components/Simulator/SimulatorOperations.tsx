import * as React from 'react';
import { CSSProperties, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Tooltip } from 'antd';
import { MdScreenRotation } from 'react-icons/md';
import { FiMinimize, FiMinus, FiPlus, FiRotateCw } from 'react-icons/fi';
import { IconType } from 'react-icons/lib';
import { EventEmitTypes, events, noop } from 'utils';
import classnames from 'classnames';
import { editStore } from 'states';
import { useTranslation } from 'react-i18next';

interface Props {
  toggleRotate: () => void;
}

export function SimulatorOperations({ toggleRotate }: Props) {
  const { t } = useTranslation();
  const entry = useMemo(() => {
    const node = document.createElement('div');
    node.setAttribute('class', 'simulator-operations');
    document.body.appendChild(node);
    return node;
  }, []);

  return createPortal(
    <>
      <OperationItem
        title={t('refresh page')}
        icon={FiRotateCw}
        action={() => events.emit(EventEmitTypes.RELOAD_RENDERER)}
      />
      <OperationItem title={t('toggle orientation')} icon={MdScreenRotation} action={toggleRotate} />
      <OperationItem title={t('reset rotate')} icon={FiMinimize} action={editStore.resetZoom} />
      <OperationItem
        title={t('zoom in')}
        icon={FiPlus}
        action={editStore.plusZoom}
        style={{ width: '20px', height: '20px' }}
      />
      <OperationItem
        title={t('zoom out')}
        icon={FiMinus}
        action={editStore.minZoom}
        style={{ width: '20px', height: '20px' }}
      />
    </>,
    entry,
  );
}

interface OperationItemProps {
  title: string | React.ReactElement;
  icon: IconType;
  action: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}

function OperationItem({ icon: Icon, disabled, action, title, style }: OperationItemProps) {
  return (
    <Tooltip overlayClassName="editor-operation-item-tooltip" placement="top" title={title}>
      <div onClick={disabled ? noop : action} className={classnames({ disabled })}>
        <Icon style={style} />
      </div>
    </Tooltip>
  );
}
