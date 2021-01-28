import { createElement } from 'rax';
import { ComponentProps } from '@vize/types';

export default function Container({ children, commonStyle }: ComponentProps) {
  return (
    <p className="vize-materials-universal-container" style={commonStyle}>
      {children}
    </p>
  );
}
