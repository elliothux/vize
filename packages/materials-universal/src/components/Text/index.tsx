import * as React from 'react';
import { ComponentProps } from '@vize/types';

interface Data {
  text: string;
}

export default function Text({ data: { text }, commonStyle }: ComponentProps<Data>) {
  return (
    <p className="vize-materials-universal-text" style={commonStyle}>
      {text}
    </p>
  );
}
