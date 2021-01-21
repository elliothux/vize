import * as React from 'react';
import { EmptyData } from '../../lib/components/EmptyData';
import { isChildrenEmpty } from '../../lib/utils';

interface Props {
  children: React.ReactElement[];
  commonStyle: object;
}

function Container({ children, commonStyle }: Props) {
  if (isChildrenEmpty(children)) {
    return <EmptyData text="未添加子组件" />;
  }
  return <div style={{ position: 'relative', ...commonStyle }}>{children}</div>;
}

export default Container;
