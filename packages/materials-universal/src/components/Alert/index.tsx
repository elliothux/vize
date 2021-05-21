import './index.scss';
import 'antd-mobile/es/modal/style';
import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { ComponentProps } from '@vize/types';
import { isUrl, open } from '../../lib/utils';
import { default as Modal } from 'antd-mobile/es/modal/Modal';

interface Data {
  title: string;
  desc: string;
  okText: string;
  cancelText: string;
  jumpUrl: string;
}

export default function Alert({
  data: { title, desc, okText, cancelText, jumpUrl },
  on,
  emit,
  onSelected,
}: ComponentProps<Data>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    onSelected(({ selected }) => setVisible(selected));
    on('open', () => setVisible(true));
    on('close', () => setVisible(false));
    on('toggle', () => setVisible(i => !i));
  }, []);

  useEffect(() => {
    emit(visible ? 'open' : 'close');
  }, [visible]);

  const actions = useMemo(() => {
    const actions = [
      {
        text: okText,
        style: 'primary',
        onPress: () => {
          isUrl(jumpUrl) && open(jumpUrl, true);
          setVisible(false);
        },
      },
    ];

    if (cancelText) {
      actions.unshift({
        text: cancelText,
        style: 'destructive',
        onPress: () => setVisible(false),
      });
    }

    return actions;
  }, []);

  return (
    <Modal wrapClassName="vize-materials-universal-alert" visible={visible} title={title} footer={actions} transparent>
      {desc}
    </Modal>
  );
}
