import './index.scss';
import * as React from 'react';
import { SelectType } from 'states';
import { componentsStore } from 'states';
import CommonStyleForm from './CommonStyleForm';
import { Collapse } from 'antd';
import { observer } from 'mobx-react';
import { useCurrentComponent } from 'hooks';
import { isEmpty } from 'utils';

const { Panel } = Collapse;

interface Props {
  selectType: SelectType;
}

function Empty() {
  return <div>empty</div>;
}

function IStyleAttrsEdit({ selectType }: Props) {
  const instance = useCurrentComponent()!;
  const { commonStyle, wrapperStyle } = instance;

  if (selectType === SelectType.PAGE) {
    return <div>{'page'}</div>;
  }

  if (selectType !== SelectType.COMPONENT) {
    return <Empty />;
  }

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['style', 'wrapper', 'common']}
      className="editor-attr-item editor-attr-style-item"
    >
      {isEmpty(wrapperStyle) ? null : (
        <Panel header="组件容器样式" key="wrapper">
          <CommonStyleForm style={wrapperStyle} onChange={componentsStore.setCurrentComponentInstanceWrapperStyle} />
        </Panel>
      )}
      {isEmpty(commonStyle) ? null : (
        <Panel header="组件通用样式" key="common">
          <CommonStyleForm style={commonStyle} onChange={componentsStore.setCurrentComponentInstanceCommonStyle} />
        </Panel>
      )}
    </Collapse>
  );
}
export const StyleAttrsForm = observer(IStyleAttrsEdit);

// export default IStyleAttrsEdit;
