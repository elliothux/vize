import * as React from 'react';
import { FiCornerUpLeft, FiCornerUpRight, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { OperationItem } from './OperationItem';
import { unImplemented } from './utils';

export function UndoAndClear() {
  const { t } = useTranslation();

  return (
    <>
      <OperationItem title={t('undo')} icon={FiCornerUpLeft} action={unImplemented} />
      <OperationItem title={t('redo')} icon={FiCornerUpRight} action={unImplemented} />
      <OperationItem title={t('clear')} icon={FiX} action={unImplemented} />
      <span className="operation_black" />
    </>
  );
}
