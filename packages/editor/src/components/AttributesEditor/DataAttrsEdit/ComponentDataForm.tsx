import * as React from 'react';
import { EditFilled } from '@ant-design/icons';
import { componentsStore, selectStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { observer } from 'mobx-react';
import { useCurrentComponentInstance, useCurrentComponentMeta } from 'hooks';
import { Button } from 'antd';
import { getImageSrc } from 'utils';
import { EventEmitTypes, events } from 'libs';
import { Empty } from 'widgets/Empty';
import { useTranslation, Trans } from 'react-i18next';

function IComponentDataForm() {
  const { t } = useTranslation();
  const instance = useCurrentComponentInstance()!;
  const { dataForm } = useCurrentComponentMeta()!;
  const { data, key, children, hotAreas } = instance;

  if (!instance) return <Empty text={t('Not available')} />;

  const container = children ? (
    <Button
      className="edit-container-button"
      onClick={() => selectStore.selectContainerComponent(key)}
      icon={<EditFilled />}
      type="primary"
    >
      <Trans>Edit children components</Trans>
    </Button>
  ) : null;

  const hotArea = hotAreas ? (
    <Button
      className="add-hot-area-button"
      disabled={!(getImageSrc(instance) || '').trim()}
      onClick={() => events.emit(EventEmitTypes.MANAGE_HOT_AREA, instance)}
      icon={<EditFilled />}
      type="primary"
    >
      <Trans>Edit hotareas</Trans>
    </Button>
  ) : null;

  return (
    <div className="editor-prop-item editor-prop-edit-data">
      {dataForm ? (
        <SchemaForm
          instanceKey={key}
          form={dataForm}
          data={data}
          onChange={componentsStore.setCurrentComponentInstanceData}
        />
      ) : null}
      {container}
      {hotArea}
    </div>
  );
}

export const ComponentDataForm = observer(IComponentDataForm);
