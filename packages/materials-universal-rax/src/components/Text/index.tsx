import { createElement } from 'rax';
import { ComponentProps } from '@vize/types';

export default function Text({ data: { content }, commonStyle }: ComponentProps) {
  return (
    <p className="vize-materials-universal-text" style={commonStyle}>
      {content}
    </p>
  );
}
