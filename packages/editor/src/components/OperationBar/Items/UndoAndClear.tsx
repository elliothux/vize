import * as React from 'react';
import { FiCornerUpLeft, FiCornerUpRight, FiX } from 'react-icons/fi';
import { OperationItem } from './OperationItem';
import { unImplemented } from './utils';

export function UndoAndClear() {
  return (
    <>
      <OperationItem title="undo" icon={FiCornerUpLeft} action={unImplemented} />
      <OperationItem title="redo" icon={FiCornerUpRight} action={unImplemented} />
      <OperationItem title="清除" icon={FiX} action={unImplemented} />
      <span className="operation_black" />
    </>
  );
}
