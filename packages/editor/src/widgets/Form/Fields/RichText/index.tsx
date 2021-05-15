import './index.scss';
import * as React from 'react';
import { useCallback } from 'react';
import { useBoolean } from 'react-use';
import { Button, Modal } from 'antd';
import { RichTextEditor } from 'widgets/RichTextEditor';
import { FormProps } from '../../types';

type Props = FormProps<string>;

export function RichText({ value: initValue, onChange }: Props) {
  const [visible, setVisible] = useBoolean(true);

  const onOk = useCallback(() => {
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
