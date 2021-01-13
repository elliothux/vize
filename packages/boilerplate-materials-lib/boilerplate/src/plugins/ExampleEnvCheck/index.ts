import { isMobile } from '../../libs/utils/env';

export default function({ data: { tooltip, jumpURL } }) {
  if (isMobile()) {
    return;
  }

  if (tooltip) {
    alert(tooltip);
  }

  window.location.href = jumpURL;
}
