import { Maybe } from '@vize/types';

let iframeWindow: Maybe<Window> = null;

export function setIframeWindow(win: Maybe<Window>) {
  iframeWindow = win;
}

export function getIframeWindow(defaultValue: Window): Window {
  return iframeWindow || defaultValue;
}
