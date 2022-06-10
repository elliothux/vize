import * as React from 'react';
import { Maybe, PublisherResult } from '@vize/types';
import { Button, Modal } from 'antd';
import { BiLink, BiLinkExternal, BiScan } from 'react-icons/bi';
import { Trans } from 'react-i18next';
import { copyToClipboardWithMessage } from 'utils';
import QRCode from 'qrcode.react';

export interface ResultProps {
  result: Maybe<PublisherResult>;
  setResult: (v: Maybe<PublisherResult>) => void;
  title: string;
}

export function PreviewAndPublish({ setResult, result, title }: ResultProps) {
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
        <Trans>Scan the QR code to preview the page</Trans>
      </p>
      <div className="buttons">
        <Button type="primary" onClick={() => window.open(result?.url, '__blank')} icon={<BiLinkExternal />}>
          <Trans>Open Link</Trans>
        </Button>
        <Button onClick={() => copyToClipboardWithMessage(url)} data-copy={url} icon={<BiLink />}>
          <Trans>Copy Link</Trans>
        </Button>
      </div>
    </Modal>
  );
}
