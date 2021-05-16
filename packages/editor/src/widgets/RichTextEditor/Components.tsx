import * as React from 'react';
import { useCallback } from 'react';
import { useSlate } from 'slate-react';
import { Tooltip } from 'antd';
import { isBoolean } from 'utils';
import classnames from 'classnames';
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './utils';

interface Props {
  format: string;
  icon: React.ComponentType;
  desc: string;
  onClick?: (e: React.MouseEvent) => void;
  activated?: boolean;
}

export function BlockButton({ format, icon: Icon, desc, activated }: Props) {
  const editor = useSlate();

  return (
    <Tooltip title={desc}>
      <div
        className={classnames('vize-richtext-toolbar-item block-button', {
          activated: isBoolean(activated) ? activated : isBlockActive(editor, format),
        })}
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
      >
        <Icon />
      </div>
    </Tooltip>
  );
}

export function MarkButton({ format, icon: Icon, desc, onClick, activated }: Props) {
  const editor = useSlate();

  const onButtonClick = useCallback(event => {
    event.preventDefault();
    toggleMark(editor, format);
  }, []);

  return (
    <Tooltip title={desc}>
      <div
        className={classnames('vize-richtext-toolbar-item mark-button', {
          activated: isBoolean(activated) ? activated : isMarkActive(editor, format),
        })}
        onClick={onClick || onButtonClick}
      >
        <Icon />
      </div>
    </Tooltip>
  );
}
