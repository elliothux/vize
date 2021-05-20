import 'antd-mobile/es/modal/style/index.css';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { ActionParams, Maybe } from '@vize/types';
import { default as Modal } from 'antd-mobile/es/modal';
import { createEmptyNode, isUrl, open } from '../../lib/utils';

interface Data {
  title: string;
  desc: string;
  okText: string;
  cancelText: string;
  jumpUrl: string;
}

export default function({ data: { title, desc, okText, cancelText, jumpUrl } }: ActionParams<Data>) {
  return new Promise(resolve => {
    const onPress = () => {
      return isUrl(jumpUrl) && open(jumpUrl, true);
    };
    Modal.alert(title, desc, [
      { text: cancelText },
      {
        text: okText,
        onPress: () => {
          onPress();
          return resolve();
        },
      },
    ]);
  });
}
