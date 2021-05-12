import './index.scss';
import * as React from 'react';
import { ComponentProps } from '@vize/types';

export default function HR({ commonStyle }: ComponentProps) {
  return <hr style={commonStyle} />;
}
