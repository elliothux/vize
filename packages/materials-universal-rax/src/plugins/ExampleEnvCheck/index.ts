import { PluginParams } from '@vize/types';

export default function ({ data: { tooltip, jumpURL } }: PluginParams) {
  if (/Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
    return;
  }

  if (tooltip) {
    alert(tooltip);
  }

  window.location.href = jumpURL;
}
