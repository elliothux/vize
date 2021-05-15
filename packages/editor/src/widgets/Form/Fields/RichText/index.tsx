import './index.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { useBoolean } from 'react-use';
import { Button, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { FormProps } from '../../types';
import { htmlContent } from './config';

type Props = FormProps<string>;

export function RichText({ value: initValue, onChange }: Props) {
  const [visible, setVisible] = useBoolean(true);

  const onOk = useCallback(() => {
    // onChange(stateRef.current!.toHTML());
    setVisible(false);
  }, []);

  const onCancel = useCallback(() => setVisible(false), []);

  return (
    <>
      <Button type="primary" block onClick={() => setVisible(true)}>
        编辑富文本内容
      </Button>
      <Modal
        wrapClassName="form-richtext-wrap"
        width="800px"
        visible={visible}
        maskClosable={false}
        closable={false}
        onCancel={onCancel}
        onOk={onOk}
      >
        <RichTextEditor />
      </Modal>
    </>
  );
}

function RichTextEditor() {
  return (
    <WithIframe>
      <Editor />
    </WithIframe>
  );
}

function WithIframe({ children }: PropsWithChildren<{}>) {
  const ref = useRef<HTMLIFrameElement>(null);
  const entryNode = useRef<HTMLDivElement>(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (!ref.current?.contentDocument) {
      return;
    }
    const entry = document.createElement('div');
    ref.current!.contentDocument.body.appendChild(entry);
    entryNode.current = entry;
    setRender(true);
  }, [ref.current]);

  return (
    <>
      <iframe ref={ref} />
      {render && createPortal(children, entryNode.current!)}
    </>
  );
}
