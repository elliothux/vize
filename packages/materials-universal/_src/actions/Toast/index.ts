import 'antd-mobile/lib/toast/style/index';
import Toast from 'antd-mobile/lib/toast';
import { ActionParams } from '@vize/types';

interface Data {
  text: string;
  duration: number;
  type: 'info' | 'fail' | 'success' | 'loading';
}

export default function toast({ data: { text, duration, type } }: ActionParams<Data>) {
  return new Promise(resolve => {
    Toast.hide();
    Toast[type](text, duration || 2, () => resolve(undefined));
  });
}
