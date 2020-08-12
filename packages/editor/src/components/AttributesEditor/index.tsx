import './index.scss';
import * as React from 'react';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { selectStore, SelectType } from 'states';
import { Maybe } from 'types';
import { ComponentForm } from './ComponentForm';
import { PluginForm } from './PluginForm';
import { EventEmitTypes, events } from 'utils';
import { Tabs } from 'antd';
import { FiChevronsLeft, FiDatabase, FiFastForward, FiFeather, FiGrid } from 'react-icons/fi';

const { TabPane } = Tabs;
interface Props {
    loading: boolean;
}

interface TabProps {
    key: string;
    name: string;
}

export enum AttrEditTab {
    DATA = 'data',
    STYLE = 'style',
    ANIMATION = 'animation',
    EVENTS = 'events',
}

function IAttributesEditor({ loading }: Props) {
    const { selectType } = selectStore;
    const [activeKey, setActiveKey] = useState<string>(AttrEditTab.DATA);

    useEffect(() => {
        events.on(EventEmitTypes.JUMP_ATTR_EDIT_TAB, handleSetActiveKey);
    }, []);

    const handleSetActiveKey = (newTab: string) => {
        events.emit(EventEmitTypes.CHANGE_ATTR_EDIT_TAB, newTab, activeKey);
        setActiveKey(newTab);
    };

    // the editor config title
    const title = () => {
        switch (selectType) {
            case SelectType.COMPONENT:
                return '组件编辑';
            case SelectType.PLUGIN:
                return '插件编辑';
            default:
                return '属性编辑';
        }
    };

    if (loading) {
        return null;
    }

    let content: Maybe<React.ReactElement>;
    if (selectType === SelectType.COMPONENT) {
        content = <ComponentForm />;
    } else if (selectType === SelectType.PLUGIN) {
        content = <PluginForm />;
    } else {
        // TODO
        content = null;
    }

    return (
        <div className="vize-attributes-editor">
            <p className="editor-title">{title()}</p>
            <Tabs className="editor-attr-tab" activeKey={activeKey} onChange={setActiveKey}>
                <TabPane
                    key={AttrEditTab.DATA}
                    tab={
                        <div className="tab-item-box">
                            <FiDatabase />
                            <span>&nbsp;数据</span>
                        </div>
                    }
                ></TabPane>
                <TabPane
                    key={AttrEditTab.STYLE}
                    tab={
                        <div className="tab-item-box">
                            <FiFeather />
                            <span>&nbsp;样式</span>
                        </div>
                    }
                ></TabPane>
                <TabPane
                    key={AttrEditTab.EVENTS}
                    tab={
                        <div className="tab-item-box">
                            <FiGrid />
                            <span>&nbsp;事件</span>
                        </div>
                    }
                ></TabPane>
            </Tabs>
            {content}
        </div>
    );
}

export const AttributesEditor = observer(IAttributesEditor);
