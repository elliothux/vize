import * as React from 'react';
import { FiLink, FiPlay, FiSend } from 'react-icons/fi';
import { BiScan } from 'react-icons/bi';
import { LoadingOutlined } from '@ant-design/icons';
import { editStore } from 'states';
import { observer } from 'mobx-react';
import { previewPage } from 'api';
import { useCallback, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { Maybe, GeneratorResult } from 'types';
import { copyToClipboardWithMessage } from 'utils';
import QRCode from 'qrcode.react';
import { unImplemented } from './utils';
import { OperationItem } from './OperationItem';

function IPreviewAndPublish() {
  const { debugPorts } = editStore;
  // TODO
  const isTemplate = false;
  const isUserValid = true;
  const owner = 'admin';

  const [previewResult, setPreviewResult] = useState<Maybe<GeneratorResult>>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const preview = useCallback(async () => {
    setPreviewLoading(true);
    const [success, result, response] = await previewPage(editStore.pageKey);
    if (!success) {
      console.error(response);
      return message.error('生成预览失败');
    }
    setPreviewResult(result);
    setPreviewLoading(false);
  }, []);

  return (
    <>
      <OperationItem
        title="预览"
        icon={previewLoading ? LoadingOutlined : FiPlay}
        action={preview}
        disabled={previewLoading}
      />
      <OperationItem
        disabled={isTemplate || !isUserValid || !!debugPorts}
        title={
          isTemplate || !!debugPorts ? (
            `${debugPorts ? 'Debug 模式' : '模板'}不支持发布`
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
        action={unImplemented}
      />
      <OperationItem title="查看链接" icon={FiLink} action={unImplemented} />

      <Result result={previewResult} setResult={setPreviewResult} />
    </>
  );
}

export const PreviewAndPublish = observer(IPreviewAndPublish);

interface ResultProps {
  result: Maybe<GeneratorResult>;
  setResult: (v: Maybe<GeneratorResult>) => void;
}

function Result({ setResult, result }: ResultProps) {
  const url = `${window.location.origin}${result?.url}`;

  return (
    <Modal
      keyboard
      maskClosable
      visible={!!result}
      footer={null}
      wrapClassName="generator-result"
      afterClose={() => setResult(null)}
    >
      <h1>生成预览成功</h1>
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
