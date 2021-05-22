export function isPC() {
  return !/(iPhone|iPad|iPod|iOS|Android)/i.test(window.navigator.userAgent);
}

export function isMQQ() {
  return /qq\/(\d+\.\d+)/i.test(window.navigator.userAgent.toLowerCase());
}

export function isWeixin() {
  return window.navigator.userAgent.indexOf('micromessenger') !== -1;
}

export function isWeixinMinProgram() {
  return typeof window !== 'undefined' && (window as any).__wxjs_environment === 'miniprogram';
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
}
