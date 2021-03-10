import './index.scss';
import * as React from 'react';
import { EditorResize } from './Resize';
import { UndoAndClear } from './Items/UndoAndClear';
import { Toggle } from './Items/Toggle';
import { SaveAndHistory } from './Items/SaveAndHistory';
import { PreviewAndPublish } from './Items/PreviewAndPublish';

export function OperationBar() {
  return (
    <>
      <div className="operation_bar center">
        <UndoAndClear />
        <Toggle />
        <SaveAndHistory />
        <PreviewAndPublish />
      </div>

      <div className="operation_bar right">
        <EditorResize />
      </div>
    </>
  );
}
