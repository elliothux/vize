import * as React from 'react';
import { FiSidebar } from 'react-icons/fi';
import { observer } from 'mobx-react';
import { selectStore, SelectType } from 'states';
import { Trans } from 'react-i18next';
import classnames from 'classnames';

function IPageProps() {
  const { selectType, selectPage, pageIndex } = selectStore;

  return (
    <div
      className={classnames('page-props', {
        selected: selectType === SelectType.PAGE,
      })}
      onClick={() => selectPage(pageIndex)}
    >
      <FiSidebar />
      <span>
        <Trans>Page Attributes</Trans>
      </span>
    </div>
  );
}

export const PageProps = observer(IPageProps);
