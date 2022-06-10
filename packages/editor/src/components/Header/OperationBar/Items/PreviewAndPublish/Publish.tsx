import * as React from 'react';
import { observer } from 'mobx-react';
import { editStore, globalStore } from 'states';
import { Trans, useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { Maybe, PublisherResult } from '@vize/types';
import { getPublishStatus, PublishStatus, startPublishPage } from 'api';
import { message } from 'antd';
import { hotkeyEvents, HotKeyEventTypes } from 'libs';
import { FiSend } from 'react-icons/fi';
import { OperationItem } from '../OperationItem';
import { hotKeyPrefix } from '../utils';
import { PreviewAndPublish } from './Result';

const PUBLISH_POLL_STATUS_TIME = 3000;
const MAX_PUBLISH_RETRY_TIMES = 3;

let publishTimer: Maybe<number> = null;
let publishRetryTimes = 0;

function IPublish() {
  const {
    debugPorts: [debugPort],
    owner: { name: ownerName },
    isUserValid,
  } = editStore;
  const {
    metaInfo: { isTemplate },
  } = globalStore;

  const { t } = useTranslation();
  const [publishResult, setPublishResult] = useState<Maybe<PublisherResult>>(null);
  const [publishLoading, setPublishLoading] = useState(false);

  const stopPublish = useCallback(() => {
    window.clearInterval(publishTimer!);
    publishRetryTimes = 0;
    publishTimer = null;
    setPublishLoading(false);
  }, []);

  const publish = useCallback(async () => {
    setPublishLoading(true);
    const [success, , response] = await startPublishPage(editStore.pageKey);
    if (!success) {
      setPublishLoading(false);
      console.error(response);
      return message.error(t('failed to publish'));
    }

    publishTimer = window.setInterval(async () => {
      const [success, data, response] = await getPublishStatus(editStore.pageKey);
      if (!success || !data) {
        if (publishRetryTimes > MAX_PUBLISH_RETRY_TIMES) {
          stopPublish();
          console.error(response);
          return message.error(t('failed to query publish status'));
        }
        return (publishRetryTimes += 1);
      }

      publishRetryTimes = 0;
      const { status, result, error } = data;
      if (status === PublishStatus.FAILED) {
        stopPublish();
        console.error(error);
        return message.error(t('failed to publish'));
      }
      if (status === PublishStatus.SUCCESS && result) {
        stopPublish();
        setPublishResult(result);
      }
    }, PUBLISH_POLL_STATUS_TIME);
  }, []);

  useEffect(() => {
    hotkeyEvents.only(HotKeyEventTypes.PUBLISH, publish);
  }, []);

  return (
    <>
      <OperationItem
        disabled={isTemplate || !isUserValid || !!debugPort}
        title={
          isTemplate || !!debugPort ? (
            t('Publish not allowed with {{type}}', {
              type: debugPort ? 'Debug Mode' : 'template page',
            })
          ) : isUserValid ? (
            <>
              <p>
                <Trans>publish</Trans>
              </p>
              <p className="desc">({hotKeyPrefix} + U)</p>
            </>
          ) : (
            <p>
              {t("Don't have permission to {{type}}", { type: 'publish' })}
              <br />（{t('Created by {{owner}}', { owner: ownerName })}）
            </p>
          )
        }
        icon={FiSend}
        action={publish}
        loading={publishLoading}
      />
      <PreviewAndPublish title={t('Publish success')} result={publishResult} setResult={setPublishResult} />
    </>
  );
}

export const Publish = observer(IPublish);
