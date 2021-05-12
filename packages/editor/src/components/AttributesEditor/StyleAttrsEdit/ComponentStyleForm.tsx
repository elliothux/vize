import * as React from 'react';
import { observer } from 'mobx-react';
import { Collapse } from 'antd';
import { isEmpty } from 'utils';
import { componentsStore } from 'states';
import { useTranslation } from 'react-i18next';
import { useCurrentComponentInstance, useCurrentComponentMeta } from 'hooks';
import { Empty } from 'widgets/Empty';
import { SchemaForm } from 'widgets/Form';
import { MaterialsErrorBoundary } from 'components/MaterialsErrorBoundary';
import { CommonStyleForm } from './CommonStyleForm';

const { Panel } = Collapse;

function IComponentStyleForm() {
  const { t } = useTranslation();
  const instance = useCurrentComponentInstance();
  const { styleForm } = useCurrentComponentMeta()!;

  if (!instance) {
    return <Empty text={t('Not available')} />;
  }

  const { component, key, style, commonStyle, wrapperStyle } = instance;

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['style', 'wrapper', 'common']}
      className="editor-prop-item editor-prop-edit-style component with-collapsed"
    >
      {isEmpty(styleForm) ? null : (
        <Panel header={t('Custom style of component')} key="style">
          <MaterialsErrorBoundary type="component" identityName={component} isForm>
            <SchemaForm
              instanceKey={key}
              form={styleForm!}
              data={style}
              onChange={componentsStore.setCurrentComponentInstanceStyle}
            />
          </MaterialsErrorBoundary>
        </Panel>
      )}
      {isEmpty(wrapperStyle) ? null : (
        <Panel header={t('Wrapper style of component')} key="wrapper">
          <CommonStyleForm style={wrapperStyle} onChange={componentsStore.setCurrentComponentInstanceWrapperStyle} />
        </Panel>
      )}
      {isEmpty(commonStyle) ? null : (
        <Panel header={t('Common style of component')} key="common" className="common-style-form-panel">
          <CommonStyleForm style={commonStyle} onChange={componentsStore.setCurrentComponentInstanceCommonStyle} />
        </Panel>
      )}
    </Collapse>
  );
}

export const ComponentStyleForm = observer(IComponentStyleForm);
