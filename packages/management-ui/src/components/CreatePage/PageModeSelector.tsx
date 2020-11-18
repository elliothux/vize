import * as React from 'react';
import { Maybe, PageMode } from 'types';
import { Checkbox } from 'antd';
import { BiOutline, BiNote } from 'react-icons/bi';
import { ItemProps } from './types';

export function PageModeSelector({ current, setCurrent, showErr }: ItemProps<Maybe<PageMode>>) {
  return (
    <div className="form-item">
      <div className="mode-items">
        <div className="mode-item">
          <Checkbox checked={current === PageMode.SINGLE} onClick={() => setCurrent(PageMode.SINGLE)}>
            <BiNote />
            <h3>单页模式</h3>
            <p>多页面以单页应用的方式加载，所有页面共享插件上下文</p>
          </Checkbox>
        </div>

        <div className="mode-item">
          <Checkbox checked={current === PageMode.MULTI} onClick={() => setCurrent(PageMode.MULTI)}>
            <BiOutline />
            <h3>多页模式</h3>
            <p>多页面间互相独立，每个页面有单独的插件上下文</p>
          </Checkbox>
        </div>
      </div>

      {!current && showErr ? (
        <div className="form-item-err">
          <span>*</span> 请选择【页面模式】后再完成页面创建
        </div>
      ) : null}
    </div>
  );
}
