import * as React from 'react';
import { useCallback, useState } from 'react';
import { FiLink, FiSend, FiPlay } from 'react-icons/fi';
import { BiScan } from 'react-icons/bi';
import { LoadingOutlined } from '@ant-design/icons';
import { editStore } from 'states';
import { observer } from 'mobx-react';
import { BuildStatus, getPublishStatus, previewPage, startPublishPage } from 'api';
import { Button, message, Modal } from 'antd';
import { GeneratorResult, Maybe } from 'types';
import { copyToClipboardWithMessage } from 'utils';
import QRCode from 'qrcode.react';
import { unImplemented } from './utils';
import { OperationItem } from './OperationItem';

const PUBLISH_POLL_STATUS_TIME = 3000;
const MAX_PLBLISH_RETRY_TIMES = 3;

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

  const [previewResult, setPreviewResult] = useState<Maybe<GeneratorResult>>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const preview = useCallback(async () => {
    setPreviewLoading(true);
    const [success, result, response] = await previewPage(editStore.pageKey);
    setPreviewLoading(false);
    if (!success) {
      console.error(response);
      return message.error('生成预览失败');
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
      return message.error('发布失败');
    }

    publishTimer = window.setInterval(async () => {
      const [success, data, response] = await getPublishStatus(editStore.pageKey);
      if (!success || !data) {
        if (publishRetryTimes > MAX_PLBLISH_RETRY_TIMES) {
          stopPublish();
          console.error(response);
          return message.error('查询发布状态失败');
        }
        return (publishRetryTimes += 1);
      }

      publishRetryTimes = 0;
      const [status, result] = data;
      if (status === BuildStatus.FAILED) {
        stopPublish();
        return message.error('发布失败');
      }
      if (status === BuildStatus.SUCCESS && data) {
        stopPublish();
        setPublishResult(result);
      }
    }, PUBLISH_POLL_STATUS_TIME);
  }, []);

  return (
    <>
      <OperationItem title="预览" icon={FiPlay} action={preview} loading={previewLoading} />
      <OperationItem
        disabled={isTemplate || !isUserValid || !!debugPort}
        title={
          isTemplate || !!debugPort ? (
            `${debugPort ? 'Debug 模式' : '模板'}不支持发布`
          ) : isUserValid ? (
            '发布'
          ) : (
            <p>
              没有发布权限
              <br />
              （由 {owner} 创建）
            </p>
          )
        }
        icon={FiSend}
        action={publish}
        loading={publishLoading}
      />
      <OperationItem title="查看链接" icon={FiLink} action={unImplemented} />

      <Result title="生成预览成功" result={previewResult} setResult={setPreviewResult} />
      <Result title="发布完成" result={publishResult} setResult={setPublishResult} />
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
        手机扫码预览页面
      </p>
      <div className="buttons">
        <Button type="primary" onClick={() => window.open(result?.url, '__blank')}>
          打开链接
        </Button>
        <Button onClick={() => copyToClipboardWithMessage(url)} data-copy={url}>
          复制链接
        </Button>
      </div>
    </Modal>
  );
}
