import * as React from 'react';
import { LayoutMode, Maybe } from 'types';
import { Checkbox } from 'antd';
import { BiOutline } from 'react-icons/bi';
import { ItemProps } from './types';

export function LayoutModeSelector({ current, setCurrent }: ItemProps<Maybe<LayoutMode>>) {
  return (
    <div className="form-item">
      <div className="mode-items">
        <div className="mode-item">
          <Checkbox checked={current === LayoutMode.STREAM} onClick={() => setCurrent(LayoutMode.STREAM)}>
            <BiOutline />
            <h3>流式布局</h3>
            <p>所有组件从上到下排列，尺寸自适应</p>
          </Checkbox>
        </div>

        <div className="mode-item">
          <Checkbox checked={current === LayoutMode.FREE} onClick={() => setCurrent(LayoutMode.FREE)}>
            <BiOutline />
            <h3>自由布局</h3>
            <p>组件自由拖拽排列，尺寸按照屏幕宽度等比缩放</p>
          </Checkbox>
        </div>
      </div>
    </div>
  );
}
