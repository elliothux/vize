import './index.scss';
import * as React from 'react';
import { SelectType } from 'states';
import { componentsStore, globalStore } from 'states';
import { Collapse } from 'antd';
import { observer } from 'mobx-react';
import { useCurrentComponentInstance } from 'hooks';
import { isEmpty } from 'utils';
import { useTranslation } from 'react-i18next';
import { NotAvailable } from '../NotAvailable';
import { CommonStyleForm } from './CommonStyleForm';

const { Panel } = Collapse;

interface Props {
  selectType: SelectType;
}

function IStyleAttrsEdit({ selectType }: Props) {
  const { t } = useTranslation();
  const instance = useCurrentComponentInstance();
  const { globalStyle } = globalStore;

  if (selectType === SelectType.GLOBAL) {
    return (
      <div className="editor-prop-item editor-prop-edit-style">
        <CommonStyleForm style={globalStyle} onChange={globalStore.setGlobalStyle} />
      </div>
    );
  }

  if (selectType !== SelectType.COMPONENT || !instance) {
    return <NotAvailable />;
  }

  const { commonStyle, wrapperStyle } = instance;

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['style', 'wrapper', 'common']}
      className="editor-prop-item editor-prop-edit-style"
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

// export default IStyleAttrsEdit;
