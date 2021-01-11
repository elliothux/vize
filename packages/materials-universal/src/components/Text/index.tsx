import './index.scss';
import * as React from 'react';

interface Props {
  data: {
    text: string;
  };
  commonStyle: object;
  emit: any;
}

export default function Text({ data: { text = 'test' }, commonStyle, emit }: Props) {
  if (text.length > 10) {
    emit('length');
  }

  return (
    <p className="vize-materials-universal text" style={commonStyle}>
      {text}
    </p>
  );
}
