import 'antd-mobile/es/modal/style/index';
import { ActionParams } from '@vize/types';
import { default as Modal } from 'antd-mobile/es/modal';
import { isUrl, open } from '../../lib/utils';

interface Data {
  title: string;
  desc: string;
  okText: string;
  cancelText: string;
  jumpUrl: string;
}

export default function({ data: { title, desc, okText, cancelText, jumpUrl } }: ActionParams<Data>) {
  return new Promise(resolve => {
    const actions = [
      {
        text: okText,
        style: 'primary',
        onPress: () => {
          isUrl(jumpUrl) && open(jumpUrl, true);
          return resolve(undefined);
        },
      },
    ];

    if (cancelText) {
      actions.unshift({
        text: cancelText,
        style: 'destructive',
        onPress: () => {
          return resolve(undefined);
        },
      });
    }

    Modal.alert(title, desc, actions);
  });
}
