import * as React from 'react';
import { Empty as IEmpty } from 'antd';
import { CSSProperties } from 'react';
import './index.scss';

interface Props {
  text?: string;
  className?: string;
  hideImage?: boolean;
  style?: CSSProperties;
}

export function Empty({ text, className, style, hideImage = false }: Props) {
  return (
    <div className={`vize-empty ${className || ''}`} style={style}>
      <IEmpty description={text || 'Empty'} imageStyle={hideImage ? { display: 'none' } : {}} />
    </div>
  );
}
