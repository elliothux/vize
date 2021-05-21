import './index.scss';
import * as React from 'react';
import { memo, useEffect, useState } from 'react';
import { EventEmitTypes, events } from 'libs';
import { InstancesView } from './InstancesView';
import { ComponentsLibrary, PluginsLibrary } from './MaterialsLibrary';
import { MaterialsViewType } from './HeaderOptions';

interface Props {
  loading: boolean;
}

function IMaterialsView({ loading }: Props) {
  const [view, setView] = useState<MaterialsViewType>(MaterialsViewType.INSTANCES);

  useEffect(() => {
    events.on(EventEmitTypes.SET_MATERIALS_VIEW_TYPE, setView);
  }, []);

  let content: React.ReactNode = null;
  if (!loading) {
    switch (view) {
      case MaterialsViewType.COMPONENTS:
        content = <ComponentsLibrary />;
        break;
      case MaterialsViewType.PLUGINS:
        content = <PluginsLibrary />;
        break;
      case MaterialsViewType.INSTANCES:
        content = <InstancesView />;
        break;
    }
  }

  return <div className="vize-materials-view">{content}</div>;
}

export const MaterialsView = memo(IMaterialsView);
