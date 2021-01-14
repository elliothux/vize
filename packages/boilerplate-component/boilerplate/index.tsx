import './index.scss';
import * as React from 'react';

export default function Text({ data: { text }, style: { color } }) {
  return (
    <p className="example-text" style={{ color }}>
      {text}
    </p>
  );
}
