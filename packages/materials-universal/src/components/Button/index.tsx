import './index.scss';
// import 'antd-mobile/es/button/style/index';
import * as React from 'react';
import { ComponentProps } from '@vize/types';
// import { default as ButtonComponent } from 'antd-mobile/es/button';

interface Data {
  text: string;
}

export default function Button({ data: { text }, commonStyle }: ComponentProps<Data>) {
  return (
    <button className="vize-materials-universal-button" style={commonStyle}>
      {text}
    </button>
  );
}
