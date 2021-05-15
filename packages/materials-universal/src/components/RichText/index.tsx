import './index.scss';
import * as React from 'react';
import { ComponentProps } from '@vize/types';

export default function Text({ data: { text }, style: { color } }: ComponentProps) {
  return (
    <p className="example-text" style={{ color }}>
      {text}
    </p>
  );
}
