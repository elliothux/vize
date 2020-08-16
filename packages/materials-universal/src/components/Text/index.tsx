import './index.scss';
import * as React from 'react';

interface Props {
  data: {
    text: string;
  };
  commonStyle: object;
}

export default function Text({ data: { text = 'test' }, commonStyle }: Props) {
  return (
    <p className="vize-materials-universal text" style={commonStyle}>
      {text}
    </p>
  );
}
