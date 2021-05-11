import * as React from 'react';
import { EditFilled } from '@ant-design/icons';
import { componentsStore, selectStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { observer } from 'mobx-react';
import { useCurrentComponentInstance, useCurrentComponentMeta } from 'hooks';
import { Button } from 'antd';
import { getImageSrc, isEmpty } from 'utils';
import { EventEmitTypes, events } from 'libs';
import { Empty } from 'widgets/Empty';
import { MaterialsErrorBoundary } from 'components/MaterialsErrorBoundary';
import { useTranslation, Trans } from 'react-i18next';

function IComponentDataForm() {
  const { t } = useTranslation();
  const instance = useCurrentComponentInstance()!;
  const { dataForm } = useCurrentComponentMeta()!;

  if (!instance) {
    return <Empty text={t('Not available')} />;
  }

  const { component, data, key, children, hotAreas } = instance;

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
      {isEmpty(dataForm) ? null : (
        <MaterialsErrorBoundary type="component" identityName={component} isForm>
          <SchemaForm
            instanceKey={key}
            form={dataForm!}
            data={data}
            onChange={componentsStore.setCurrentComponentInstanceData}
          />
        </MaterialsErrorBoundary>
      )}
      {container}
      {hotArea}
    </div>
  );
}

export const ComponentDataForm = observer(IComponentDataForm);
