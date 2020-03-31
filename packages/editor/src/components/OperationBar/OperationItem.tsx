import * as React from "react";
import { TooltipPlacement } from "antd/lib/tooltip";
import { Tooltip } from "antd";
import { IconType } from "react-icons/lib";
import classnames from "classnames";
import { noop } from "utils";

export interface OperationItemProps {
  title: string | React.ReactElement;
  icon: IconType;
  action: () => void;
  disabled?: boolean;
  placement?: TooltipPlacement;
}

export function OperationItem(props: OperationItemProps) {
  const { icon: Icon, disabled, placement } = props;
  return (
    <Tooltip
      overlayClassName="editor-operation-item-tooltip"
      placement={placement || "bottom"}
      title={props.title}
    >
      <div
        onClick={disabled ? noop : props.action}
        className={classnames("operation_item", { disabled })}
      >
        <Icon />
      </div>
    </Tooltip>
  );
}
