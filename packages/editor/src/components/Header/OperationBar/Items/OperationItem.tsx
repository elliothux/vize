import * as React from 'react';
import { Tooltip } from 'antd';
import { IconType } from 'react-icons/lib';
import { TooltipPlacement } from 'antd/lib/tooltip';
import { BiLoaderAlt } from 'react-icons/bi';
import classnames from 'classnames';
import { noop } from 'utils';

export interface OperationItemProps {
  title: string | React.ReactElement;
  icon: IconType;
  action: () => void;
  disabled?: boolean;
  loading?: boolean;
  placement?: TooltipPlacement;
}

export function OperationItem({ icon: Icon, disabled, placement, loading, action, title }: OperationItemProps) {
  return (
    <Tooltip overlayClassName="vize-editor-operation-item-tooltip" placement={placement || 'bottom'} title={title}>
      <div onClick={disabled || loading ? noop : action} className={classnames('operation_item', { disabled })}>
        {loading ? <BiLoaderAlt className="icon-loading" /> : <Icon />}
      </div>
    </Tooltip>
  );
}
