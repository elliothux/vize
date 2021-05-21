import 'antd-mobile/es/modal/style/index.css';
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
    const onPress = () => {
      isUrl(jumpUrl) && open(jumpUrl, true);
      return resolve();
    };
    const actions = [{ text: okText, onPress }];
    if (cancelText) {
      actions.push({ text: cancelText, onPress });
    }
    Modal.alert(title, desc, actions);
  });
}
