import * as React from 'react';
import { componentsStore, selectStore } from 'states';
import { useMemo } from 'react';
import { getCurrentPageComponentIndex } from 'utils';
import { ComponentInstance } from 'types';
import { SchemaForm } from 'widgets/Form';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { getMaterialsComponentMeta } from 'runtime';

function IComponentForm() {
  const { componentInstances } = componentsStore;
  const { componentKey } = selectStore;

  const { index, parentIndex } = useMemo(() => getCurrentPageComponentIndex(componentKey)!, [
    componentKey,
    componentInstances,
  ]);

  const { data, style, component, key } = useMemo<ComponentInstance>(() => {
    return parentIndex ? componentInstances[parentIndex].children![index] : componentInstances[index];
  }, [index, parentIndex, componentInstances]);

  const { dataForm, styleForm } = useMemo(() => getMaterialsComponentMeta(component)!, [component]);

  return (
    <>
      {dataForm ? (
        <SchemaForm
          instanceKey={key}
          form={dataForm}
          data={toJS(data)}
          onChange={componentsStore.setCurrentComponentInstanceData}
        />
      ) : null}

      {styleForm ? (
        <SchemaForm
          instanceKey={key}
          form={styleForm}
          data={toJS(style)}
          onChange={componentsStore.setCurrentComponentInstanceStyle}
        />
      ) : null}
    </>
  );
}

export const ComponentForm = observer(IComponentForm);
