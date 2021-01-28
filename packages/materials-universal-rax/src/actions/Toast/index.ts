import UToast from 'universal-toast/src/web';
import { ActionParams } from '@vize/types/src';

export default function Toast({ data: { text, duration } }: ActionParams) {
  return UToast.show(text, duration);
}
