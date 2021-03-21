import './index.scss';
import * as React from 'react';
import { SelectType } from 'states';
import { componentsStore } from 'states';
import { Collapse } from 'antd';
import { observer } from 'mobx-react';
import { useCurrentComponentInstance } from 'hooks';
import { isEmpty } from 'utils';
import { useTranslation } from 'react-i18next';
import { NotAvailable } from '../NotAvailable';
import { CommonStyleForm } from './CommonStyleForm';
import { GlobalStyleForm } from './GlobalStyleForm';

const { Panel } = Collapse;

interface Props {
  selectType: SelectType;
}

function IStyleAttrsEdit({ selectType }: Props) {
  const { t } = useTranslation();
  const instance = useCurrentComponentInstance();

  if (selectType === SelectType.GLOBAL) {
    return <GlobalStyleForm />;
  }

  if (selectType !== SelectType.COMPONENT || !instance) {
    return <NotAvailable />;
  }

  const { commonStyle, wrapperStyle } = instance;

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['wrapper', 'common']}
      className="editor-prop-item editor-prop-edit-style with-collapsed"
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

export const StyleAttrsForm = observer(IStyleAttrsEdit);
