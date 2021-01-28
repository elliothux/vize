import { createElement } from 'rax';
import { ComponentProps } from '@vize/types';

export default function Container({ children, commonStyle }: ComponentProps) {
  return (
    <div className="vize-materials-universal-container" style={commonStyle}>
      {children}
    </div>
  );
}
