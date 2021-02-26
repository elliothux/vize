import { Maybe, PluginParams } from '@vize/types';

let timer: Maybe<number> = null;

export default function({ data: { duration }, emit }: PluginParams) {
  if (timer) {
    window.clearTimeout(timer);
  }

  timer = window.setTimeout(() => {
    emit('browserDuration');
    timer = null;
  }, duration * 1000);
}
