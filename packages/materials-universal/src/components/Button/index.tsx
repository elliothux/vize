import * as React from 'react';
import { ComponentProps } from '@vize/types';
import { default as ButtonComponent } from 'antd-mobile/es/button';
import 'antd-mobile/es/button/style/index.css';
import './index.scss';

interface Data {
  text: string;
}

export default function Button({ data: { text }, commonStyle }: ComponentProps<Data>) {
  return (
    <ButtonComponent className="vize-materials-universal-button" style={commonStyle}>
      {text}
    </ButtonComponent>
  );
}
