import * as React from 'react';
import { Result, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Maybe, PageRecord } from 'types';
import { useTranslation, Trans } from 'react-i18next';
import { goToEditor } from 'utils';

interface Props {
  pageRecord: Maybe<PageRecord>;
  onClose: () => void;
}

export function CreateResult({ pageRecord, onClose }: Props) {
  const { t } = useTranslation();

  if (pageRecord) {
    return (
      <Result
        status="success"
        title={t('Created')}
        subTitle={`${t('Created page successfully with')} ID: ${pageRecord.id}`}
        extra={
          <>
            <Button type="primary" onClick={() => goToEditor(pageRecord)}>
              <Trans>go edit</Trans>
            </Button>
            <Button onClick={onClose}>
              <Trans>close</Trans>
            </Button>
          </>
        }
      />
    );
  }

  return (
    <div className="page-create-result">
      <LoadingOutlined />
      <p>
        <Trans>Waiting</Trans>
      </p>
    </div>
  );
}
