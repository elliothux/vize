import * as React from 'react';
import { ComponentProps } from '@vize/types';
// import { Render } from '@vize/richtext-render';

export default function RichText({
  data: {
    content: { html },
  },
  commonStyle,
}: ComponentProps) {
  return null;
  // return <Render content={html} style={commonStyle} />;
}
