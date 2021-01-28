import './index.scss';
import { createElement } from 'rax';
import { ComponentProps } from '@vize/types/src';

export default function Button({ data: { text }, commonStyle }: ComponentProps) {
  return (
    <button className="vize-materials-universal-button" style={commonStyle}>
      {text}
    </button>
  );
}
