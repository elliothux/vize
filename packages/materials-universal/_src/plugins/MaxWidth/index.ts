import { ComponentProps } from '@vize/types';

interface Data {
  maxWidth: number;
}

export default function maxWidth({ data: { maxWidth } }: ComponentProps<Data>) {
  const style = document.createElement('style');
  style.innerHTML = `\n
  body {
    max-width: ${maxWidth}px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }`;
  style.className = 'vize-materials-universal-plugin-max-width';
  document.head.appendChild(style);
}
