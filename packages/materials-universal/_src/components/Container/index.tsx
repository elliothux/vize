import * as React from 'react';
import { ComponentProps } from '@vize/types';
import { isChildrenEmpty } from '../../lib/utils';
import { EmptyData } from '../../lib/components/EmptyData';

export default function Container({ children, commonStyle }: ComponentProps) {
  return (
    <div className="vize-materials-universal-container" style={commonStyle}>
      {isChildrenEmpty(children) ? <EmptyData text="未添加子组件" /> : children}
    </div>
  );
}
