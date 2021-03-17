import * as React from 'react';
import classNames from 'classnames';
import { events, EventEmitTypes } from 'utils';
import { WithReactChildren } from 'types';
import { Trans } from 'react-i18next';
import { FiColumns, FiLayers, FiPackage } from 'react-icons/fi';

export enum MaterialsViewType {
  COMPONENTS = 'components',
  PLUGINS = 'plugins',
  INSTANCES = 'instances',
}

interface Props extends WithReactChildren {
  type: MaterialsViewType;
}

function setView(view: MaterialsViewType) {
  events.emit(EventEmitTypes.SET_MATERIALS_VIEW_TYPE, view);
}

const [setComponentsView, setPluginsView, setInstancesView] = [
  MaterialsViewType.COMPONENTS,
  MaterialsViewType.PLUGINS,
  MaterialsViewType.INSTANCES,
].map(i => () => setView(i));

export function HeaderOptions({ type, children }: Props) {
  return (
    <header>
      <div className="header-options">
        <p
          onClick={setInstancesView}
          className={classNames({
            activated: type === MaterialsViewType.INSTANCES,
          })}
        >
          <FiColumns />
          <Trans>Page</Trans>
        </p>
        <p
          onClick={setComponentsView}
          className={classNames({
            activated: type === MaterialsViewType.COMPONENTS,
          })}
        >
          <FiLayers />
          <Trans>Components library</Trans>
        </p>
        <p
          onClick={setPluginsView}
          className={classNames({
            activated: type === MaterialsViewType.PLUGINS,
          })}
        >
          <FiPackage />
          <Trans>Plugins library</Trans>
        </p>
      </div>
      {children}
    </header>
  );
}
