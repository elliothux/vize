import './index.scss';
import * as React from 'react';
import { ComponentProps } from '@vize/types';

export default function RichText({ data: { content }, commonStyle }: ComponentProps) {
  return (
    <div
      className="vize-materials-universal-richtext"
      style={commonStyle}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
