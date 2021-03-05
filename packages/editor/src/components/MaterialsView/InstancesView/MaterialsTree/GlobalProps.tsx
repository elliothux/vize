import * as React from 'react';
import { FiGlobe } from 'react-icons/fi';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { selectStore, SelectType } from 'states';
import { Trans } from 'react-i18next';

function IGlobalProps() {
  const { selectType, selectPage, pageIndex } = selectStore;

  return (
    <div
      className={classnames('global-props', {
        selected: selectType === SelectType.GLOBAL,
      })}
      onClick={() => selectPage(pageIndex)}
    >
      <FiGlobe />
      <span>
        <Trans>Global Attributes</Trans>
      </span>
    </div>
  );
}

export const GlobalProps = observer(IGlobalProps);
