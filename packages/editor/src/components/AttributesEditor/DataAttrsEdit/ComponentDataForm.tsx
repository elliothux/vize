import * as React from 'react';
import { componentsStore, selectStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useCurrentComponentInstance, useCurrentComponentMeta } from 'hooks';
import { Button } from 'antd';
import { EventEmitTypes, events, getImageSrc } from 'utils';
import { Empty } from 'widgets/Empty';

function IComponentDataForm() {
  const instance = useCurrentComponentInstance()!;
  const { dataForm } = useCurrentComponentMeta()!;
  const { data, key, children, hotAreas } = instance;

  if (!instance) return <Empty text="不可用" />;

  const container = children ? (
    <Button
      className="edit-container-button"
      onClick={() => selectStore.selectContainerComponent(key)}
      icon="edit"
      type="primary"
    >
      编辑容器
    </Button>
  ) : null;

  const hotArea = hotAreas ? (
    <Button
      className="add-hot-area-button"
      disabled={!(getImageSrc(instance) || '').trim()}
      onClick={() => events.emit(EventEmitTypes.MANAGE_HOT_AREA, instance)}
      icon="edit"
      type="primary"
    >
      编辑热区
    </Button>
  ) : null;

  return (
    <div className="editor-prop-item editor-prop-edit-data">
      {dataForm ? (
        <SchemaForm
          instanceKey={key}
          form={dataForm}
          data={toJS(data)}
          onChange={componentsStore.setCurrentComponentInstanceData}
        />
      ) : null}
      {container}
      {hotArea}

      {/* {styleForm ? (
                <SchemaForm
                    instanceKey={key}
                    form={styleForm}
                    data={toJS(style)}
                    onChange={componentsStore.setCurrentComponentInstanceStyle}
                />
            ) : null} */}
    </div>
  );
}

export const ComponentDataForm = observer(IComponentDataForm);
