import * as React from 'react';
import classNames from 'classnames';
import { events, EventEmitTypes } from 'utils';
import { WithReactChildren } from 'types';

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
          页面
        </p>
        <p
          onClick={setComponentsView}
          className={classNames({
            activated: type === MaterialsViewType.COMPONENTS,
          })}
        >
          组件库
        </p>
        <p
          onClick={setPluginsView}
          className={classNames({
            activated: type === MaterialsViewType.PLUGINS,
          })}
        >
          插件库
        </p>
      </div>
      {children}
    </header>
  );
}
