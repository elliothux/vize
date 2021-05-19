import './index.scss';
import * as React from 'react';
import { useCallback, ComponentProps } from 'react';
import { useBoolean } from 'react-use';
import { Button, Modal } from 'antd';
import { Editor, getRawValue, getHTML } from '@vize/richtext-editor';
import { FormProps } from '../../types';

type Props = FormProps<{
  raw?: ComponentProps<typeof Editor>['initRawValue'];
  html?: string;
}>;

export function RichText({ value: { raw, html }, onChange }: Props) {
  const [visible, setVisible] = useBoolean(false);

  const onOk = useCallback(() => {
    onChange({
      raw: getRawValue(),
      html: getHTML(),
    });
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
        <Editor initValue={html} initRawValue={raw} />
      </Modal>
    </>
  );
}
