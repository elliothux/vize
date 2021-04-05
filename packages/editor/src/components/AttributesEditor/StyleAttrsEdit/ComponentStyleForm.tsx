import * as React from 'react';
import { observer } from 'mobx-react';
import { Collapse } from 'antd';
import { isEmpty } from 'utils';
import { componentsStore } from 'states';
import { useTranslation } from 'react-i18next';
import { useCurrentComponentInstance } from 'hooks';
import { CommonStyleForm } from './CommonStyleForm';

const { Panel } = Collapse;

function IComponentStyleForm() {
  const { t } = useTranslation();
  const instance = useCurrentComponentInstance();

  if (!instance) {
    return null;
  }

  const { commonStyle, wrapperStyle } = instance;

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['wrapper', 'common']}
      className="editor-prop-item editor-prop-edit-style component with-collapsed"
    >
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
