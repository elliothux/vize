import * as React from 'react';
import { ReactEditor } from 'slate-react';
import classnames from 'classnames';
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './utils';

interface Props {
  format: string;
  icon: React.ComponentType;
  editor: ReactEditor;
}

export function BlockButton({ editor, format, icon: Icon }: Props) {
  return (
    <div
      className={classnames('vize-richtext-toolbar-item block-button', { activated: isBlockActive(editor, format) })}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon />
    </div>
  );
}

export function MarkButton({ editor, format, icon: Icon }: Props) {
  return (
    <div
      className={classnames('vize-richtext-toolbar-item mark-button', { activated: isMarkActive(editor, format) })}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon />
    </div>
  );
}
