import './index.scss';
import * as React from 'react';

interface Props {
  children?: React.ReactChildren;
  commonStyle: any;
}

export default function BottomSwiperContainer({ children, commonStyle }: Props) {
  return (
    <div className="vize-materials-universal bottom-swipe-container" style={commonStyle}>
      <div className="bottom-swipe-container-controller">
        <span />
      </div>
      {children}
    </div>
  );
}
