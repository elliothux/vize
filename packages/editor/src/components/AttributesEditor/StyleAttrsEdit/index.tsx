import './index.scss';
import React from 'react';
import { SelectType } from 'states';
// import { componentsStore, materialsStore } from 'states';
// import { useMemo } from 'react';
import { Collapse } from 'antd';
// import { isEmpty } from 'utils';
const { Panel } = Collapse;

interface Props {
    selectType: number;
}

function Empty() {
    return <div>empty</div>;
}

function IStyleAttrsEdit({ selectType }: Props) {
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
                1111
            </Panel>
            {/* {isEmpty()} */}
        </Collapse>
    );
}

export default IStyleAttrsEdit;
