import './index.scss';
import * as React from 'react';
import { useMemo } from 'react';
import { SelectType } from 'states';
import { componentsStore, selectStore } from 'states';
import { getCurrentPageComponentIndex } from 'utils';
import { ComponentInstance } from 'types';
import CommonStyleForm from './CommonStyleForm';
import { Collapse } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

// import { isEmpty } from 'utils';
const { Panel } = Collapse;

interface Props {
  selectType: SelectType;
}

function Empty() {
  return <div>empty</div>;
}

function IStyleAttrsEdit({ selectType }: Props) {
  const { componentInstances } = componentsStore;
  const { componentKey } = selectStore;
  const { index, parentIndex } = useMemo(() => getCurrentPageComponentIndex(componentKey)!, [
    componentKey,
    componentInstances,
  ]);
  const { commonStyle } = useMemo<ComponentInstance>(() => {
    return parentIndex ? componentInstances[parentIndex].children![index] : componentInstances[index];
  }, [index, parentIndex, componentInstances]);
  // const { dataForm } = useMemo(() => materialsStore.getComponentMeta(component), [component]);

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
      <Panel header="组件通用样式" key="common">
        <CommonStyleForm style={toJS(commonStyle)} onChange={componentsStore.setCurrentComponentInstanceCommonStyle} />
      </Panel>
      {/* {isEmpty()} */}
    </Collapse>
  );
}
export const StyleAttrsForm = observer(IStyleAttrsEdit);

// export default IStyleAttrsEdit;
