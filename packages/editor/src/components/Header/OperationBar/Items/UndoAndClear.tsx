import * as React from 'react';
import { FiCornerUpLeft, FiCornerUpRight, FiX } from 'react-icons/fi';
import { Trans, useTranslation } from 'react-i18next';
import { OperationItem } from './OperationItem';
import { hotKeyPrefix, unImplemented } from './utils';

export function UndoAndClear() {
  const { t } = useTranslation();

  return (
    <>
      <OperationItem
        title={
          <>
            <p>
              <Trans>undo</Trans>
            </p>
            <p className="desc">({hotKeyPrefix} + Z)</p>
          </>
        }
        icon={FiCornerUpLeft}
        action={unImplemented}
      />
      <OperationItem
        title={
          <>
            <p>
              <Trans>redo</Trans>
            </p>
            <p className="desc">({hotKeyPrefix} + Shift + Z)</p>
          </>
        }
        icon={FiCornerUpRight}
        action={unImplemented}
      />
      <OperationItem title={t('clear')} icon={FiX} action={unImplemented} />
      <span className="operation_black" />
    </>
  );
}
