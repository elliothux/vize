import * as React from 'react';
import { FiGlobe } from 'react-icons/fi';
import { observer } from 'mobx-react';
import { selectStore, SelectType } from 'states';
import { Trans } from 'react-i18next';
import classnames from 'classnames';

function IGlobalProps() {
  const { selectType, selectGlobal } = selectStore;

  return (
    <div
      className={classnames('global-props', {
        selected: selectType === SelectType.GLOBAL,
      })}
      onClick={selectGlobal}
    >
      <FiGlobe />
      <span>
        <Trans>Global Attributes</Trans>
      </span>
    </div>
  );
}

export const GlobalProps = observer(IGlobalProps);
