import './index.scss';
import * as React from 'react';
import { useCallback, useRef } from 'react';
import { useBoolean } from 'react-use';
import { Button, Modal } from 'antd';
import { RichTextEditor } from 'widgets/RichTextEditor';
import { ReactEditor } from 'slate-react';
import { FormProps } from '../../types';

type Props = FormProps<string>;

export function RichText({ value: initValue, onChange }: Props) {
  const editor = useRef<ReactEditor>();
  const getNodeRef = useRef<() => HTMLDivElement>();
  const [visible, setVisible] = useBoolean(true);

  const onOk = useCallback(() => {
    setVisible(false);
    const node = getNodeRef.current?.()?.innerHTML;
    onChange(node!);
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
        <RichTextEditor initValue={initValue} editorRef={editor} getNodeRef={getNodeRef} />
      </Modal>
    </>
  );
}
