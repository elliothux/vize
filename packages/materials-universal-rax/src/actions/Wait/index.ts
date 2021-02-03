import { ActionParams } from '@vize/types';

export default function Wait({ data: { duration } }: ActionParams) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}
