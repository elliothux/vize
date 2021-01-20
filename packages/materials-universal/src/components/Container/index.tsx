import * as React from 'react';
import { useEffect } from 'react';
import { EmptyData } from '../../lib/components/EmptyData';
import { isChildrenEmpty } from '../../lib/utils';

interface Props {
  children: React.ReactElement[];
  commonStyle: object;
  onEditChildren: Function;
}

function Container({ children, commonStyle, onEditChildren }: Props) {
  useEffect(() => {
    onEditChildren(() => console.log('onEditChildren!!!'));
  }, []);

  if (isChildrenEmpty(children)) {
    return <EmptyData text="未添加子组件" />;
  }
  return <div style={{ position: 'relative', ...commonStyle }}>{children}</div>;
}

export default Container;
