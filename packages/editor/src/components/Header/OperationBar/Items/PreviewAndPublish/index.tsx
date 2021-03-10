import * as React from 'react';
import { FiLink } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { unImplemented } from '../utils';
import { OperationItem } from '../OperationItem';
import { Preview } from './Preview';
import { Publish } from './Publish';

export function PreviewAndPublish() {
  const { t } = useTranslation();
  return (
    <>
      <Preview />
      <Publish />
      <OperationItem title={t('show link')} icon={FiLink} action={unImplemented} />
    </>
  );
}
