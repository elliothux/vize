import './index.scss';
import * as React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { useEffect, useMemo, useState } from 'react';
import { selectStore, SelectType } from 'states';
import { EventEmitTypes, events } from 'utils';
import { Tabs } from 'antd';
import { FiDatabase, FiFeather, FiGrid } from 'react-icons/fi';
import { DataAttrsEdit } from './DataAttrsEdit';
import { StyleAttrsForm } from './StyleAttrsEdit';
import { EventAttrForm } from './EventAttrForm';

interface Props {
  loading: boolean;
}

export enum AttrEditTab {
  DATA = 'data',
  STYLE = 'style',
  EVENTS = 'events',
}

const { TabPane } = Tabs;

function IAttributesEditor({ loading }: Props) {
  const { selectType } = selectStore;
  const [activeKey, setActiveKey] = useState<string>(AttrEditTab.DATA);

  const handleSetActiveKey = (newTab: string) => {
    events.emit(EventEmitTypes.CHANGE_ATTR_EDIT_TAB, newTab, activeKey);
    setActiveKey(newTab);
  };

  useEffect(() => {
    events.on(EventEmitTypes.JUMP_ATTR_EDIT_TAB, handleSetActiveKey);
  }, []);

  const title = useMemo(() => {
    switch (selectType) {
      case SelectType.GLOBAL:
        return '全局属性配置';
      case SelectType.COMPONENT:
        return '组件编辑';
      case SelectType.PLUGIN:
        return '插件编辑';
      default:
        return '属性配置';
    }
  }, [selectType]);

  if (loading) {
    return <div className="vize-attributes-editor" />;
  }

  return (
    <div className={classnames(`vize-attributes-editor ${selectType}`)}>
      <p className="editor-title">{title}</p>
      <Tabs className="editor-prop-editor-tab" activeKey={activeKey} onChange={setActiveKey} animated>
        <TabPane
          key={AttrEditTab.DATA}
          tab={
            <div className="editor-prop-tab-item">
              <FiDatabase />
              <span>&nbsp;数据</span>
            </div>
          }
        >
          <DataAttrsEdit selectType={selectType} />
        </TabPane>

        <TabPane
          key={AttrEditTab.STYLE}
          tab={
            <div className="editor-prop-tab-item">
              <FiFeather />
              <span>&nbsp;样式</span>
            </div>
          }
        >
          <StyleAttrsForm selectType={selectType} />
        </TabPane>

        <TabPane
          key={AttrEditTab.EVENTS}
          tab={
            <div className="editor-prop-tab-item">
              <FiGrid />
              <span>&nbsp;事件</span>
            </div>
          }
        >
          <EventAttrForm selectType={selectType} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export const AttributesEditor = observer(IAttributesEditor);
