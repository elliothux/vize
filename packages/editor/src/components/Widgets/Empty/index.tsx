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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Empty({ text, className, style, hideImage = false }: Props): React.ReactElement {
  return (
    <div className={`empty ${className || ''}`} style={style}>
      <IEmpty description={text || 'Empty'} imageStyle={hideImage ? { display: 'none' } : {}} />
    </div>
  );
}

export { Empty };
