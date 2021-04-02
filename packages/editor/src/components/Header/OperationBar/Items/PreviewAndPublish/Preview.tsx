import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { message } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { Maybe, PublisherResult } from 'types';
import { previewPage } from 'api';
import { editStore } from 'states';
import { hotkeyEvents, HotKeyEventTypes } from 'libs';
import { FiPlay } from 'react-icons/fi';
import { OperationItem } from '../OperationItem';
import { hotKeyPrefix } from '../utils';
import { PreviewAndPublish } from './Result';

export function Preview() {
  const { t } = useTranslation();
  const [previewResult, setPreviewResult] = useState<Maybe<PublisherResult>>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const preview = useCallback(async () => {
    setPreviewLoading(true);
    const [success, result, response] = await previewPage(editStore.pageKey);
    setPreviewLoading(false);
    if (!success) {
      console.error(response);
      return message.error(t('failed to generate preview page'));
    }
    setPreviewResult(result);
  }, []);

  useEffect(() => {
    hotkeyEvents.only(HotKeyEventTypes.PREVIEW, preview);
  }, []);

  return (
    <>
      <OperationItem
        title={
          <>
            <p>
              <Trans>preview</Trans>
            </p>
            <p className="desc">({hotKeyPrefix} + G)</p>
          </>
        }
        icon={FiPlay}
        action={preview}
        loading={previewLoading}
      />
      <PreviewAndPublish title={t('Generate preview success')} result={previewResult} setResult={setPreviewResult} />
    </>
  );
}
