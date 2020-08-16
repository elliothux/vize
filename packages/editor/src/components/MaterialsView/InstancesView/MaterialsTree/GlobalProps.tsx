import * as React from 'react';
import { FiGlobe } from 'react-icons/fi';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { selectStore, SelectType } from 'states';

function IGlobalProps() {
  const { selectType, selectPage, pageIndex } = selectStore;

  return (
    <div
      className={classnames('global-props', {
        selected: selectType === SelectType.PAGE,
      })}
      onClick={() => selectPage(pageIndex)}
    >
      <FiGlobe />
      <span>全局属性</span>
    </div>
  );
}

export const GlobalProps = observer(IGlobalProps);
