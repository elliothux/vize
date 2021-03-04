import * as React from 'react';
import { useCallback, useState } from 'react';
import { FiLink, FiSend, FiPlay } from 'react-icons/fi';
import { BiScan } from 'react-icons/bi';
import { editStore } from 'states';
import { observer } from 'mobx-react';
import { BuildStatus, getPublishStatus, previewPage, startPublishPage } from 'api';
import { Button, message, Modal } from 'antd';
import { GeneratorResult, Maybe } from 'types';
import { copyToClipboardWithMessage } from 'utils';
import { useTranslation, Trans } from 'react-i18next';
import QRCode from 'qrcode.react';
import { unImplemented } from './utils';
import { OperationItem } from './OperationItem';

const PUBLISH_POLL_STATUS_TIME = 3000;
const MAX_PUBLISH_RETRY_TIMES = 3;

let publishTimer: Maybe<number> = null;
let publishRetryTimes = 0;

function IPreviewAndPublish() {
  const {
    debugPorts: [debugPort],
  } = editStore;
  // TODO
  const isTemplate = false;
  const isUserValid = true;
  const owner = 'admin';

  const { t } = useTranslation();
  const [previewResult, setPreviewResult] = useState<Maybe<GeneratorResult>>(null);
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

  const [publishResult, setPublishResult] = useState<Maybe<GeneratorResult>>(null);
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
      const [status, result] = data;
      if (status === BuildStatus.FAILED) {
        stopPublish();
        return message.error(t('failed to publish'));
      }
      if (status === BuildStatus.SUCCESS && data) {
        stopPublish();
        setPublishResult(result);
      }
    }, PUBLISH_POLL_STATUS_TIME);
  }, []);

  return (
    <>
      <OperationItem title={t('preview')} icon={FiPlay} action={preview} loading={previewLoading} />
      <OperationItem
        disabled={isTemplate || !isUserValid || !!debugPort}
        title={
          isTemplate || !!debugPort ? (
            t('Publish not allowed with {{type}}', {
              type: debugPort ? 'Debug Mode' : 'template page',
            })
          ) : isUserValid ? (
            t('publish')
          ) : (
            <p>
              {t("don't have permission to {{type}}", { type: 'publish' })}
              <br />（{t('Create by {{owner}}', { owner })}）
            </p>
          )
        }
        icon={FiSend}
        action={publish}
        loading={publishLoading}
      />
      <OperationItem title={t('show link')} icon={FiLink} action={unImplemented} />

      <Result title={t('Generate preview success')} result={previewResult} setResult={setPreviewResult} />
      <Result title={t('Publish success')} result={publishResult} setResult={setPublishResult} />
    </>
  );
}

export const PreviewAndPublish = observer(IPreviewAndPublish);

interface ResultProps {
  result: Maybe<GeneratorResult>;
  setResult: (v: Maybe<GeneratorResult>) => void;
  title: string;
}

function Result({ setResult, result, title }: ResultProps) {
  const url = `${window.location.origin}${result?.url}`;

  return (
    <Modal
      keyboard
      maskClosable
      visible={!!result}
      footer={null}
      wrapClassName="generator-result"
      onCancel={() => setResult(null)}
    >
      <h1>{title}</h1>
      <QRCode value={url} />
      <p>
        <BiScan />
        <Trans>Scan the QR code with phone to preview the page</Trans>
      </p>
      <div className="buttons">
        <Button type="primary" onClick={() => window.open(result?.url, '__blank')}>
          <Trans>Open Link</Trans>
        </Button>
        <Button onClick={() => copyToClipboardWithMessage(url)} data-copy={url}>
          <Trans>Copy Link</Trans>
        </Button>
      </div>
    </Modal>
  );
}
