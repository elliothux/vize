import IAlert from 'universal-alert/src/web';
import { ActionParams } from '@vize/types';

export default function Alert({ data: { title, text, url } }: ActionParams) {
  return new Promise(resolve => {
    IAlert({
      title,
      content: text,
    }).then(() => {
      console.log('confirm');
      resolve();
    });
  });
}
