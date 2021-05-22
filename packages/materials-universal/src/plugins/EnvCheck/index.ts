import 'antd-mobile/lib/modal/style/index';
import { ComponentProps } from '@vize/types';
import { default as Modal } from 'antd-mobile/lib/modal';
import { isUrl, isMobile, isPC, isMQQ, isWeixinMinProgram, isWeixin } from '../../lib/utils';
import { envMap, ignoreList } from './constances';

interface Data {
  env: string;
  tooltip: string;
  jumpURL: string;
}

export default function envCheck({ data: { env, tooltip, jumpURL } }: ComponentProps<Data>) {
  for (let i = 0; i < ignoreList.length; i++) {
    if (ignoreList[i].test(window.location.host)) {
      return;
    }
  }

  if (!isUrl(jumpURL)) {
    return;
  }

  let valid;
  switch (env) {
    case envMap.mobile:
      valid = isMobile();
      break;
    case envMap.pc:
      valid = isPC();
      break;
    case envMap.qq:
      valid = isMQQ();
      break;
    case envMap.wx:
      valid = isWeixin();
      break;
    case envMap.wxmp:
      valid = isWeixinMinProgram();
      break;
    default:
      valid = false;
  }

  const jump = () => {
    window.location.href = jumpURL;
  };

  if (!valid) {
    if ((tooltip || '').trim()) {
      Modal.alert('提示', tooltip, [{ text: '确定', onPress: jump }]);
    } else {
      jump();
    }
  }
}
