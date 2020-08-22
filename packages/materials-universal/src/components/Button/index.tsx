import * as React from 'react';
import './index.scss';

interface Props {
  data: {
    text: string;
  };
  commonStyle: object;
}

export default function Button({ data: { text }, commonStyle }: Props) {
  return (
    <button className="vize-materials-universal button" style={commonStyle}>
      {text}
    </button>
  );
}
