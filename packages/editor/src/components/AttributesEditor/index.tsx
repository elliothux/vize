import './index.scss';
import * as React from 'react';
import { memo, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { componentsStore, globalStore, hotAreaStore, pagesStore, pluginsStore, selectStore, SelectType } from 'states';
import { EventEmitTypes, events } from 'libs';
import { Badge, Tabs } from 'antd';
import { FiDatabase, FiFeather, FiGrid } from 'react-icons/fi';
import { i18n } from 'i18n';
import { Trans } from 'react-i18next';
import classnames from 'classnames';
import { DataAttrsEdit } from './DataAttrsEdit';
import { StyleAttrsForm } from './StyleAttrsEdit';
import { EventAttrForm } from './EventAttrForm';
import { ChildrenComponentsEdit } from './ChildrenComponentsEdit';

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
  const { selectType, containerComponentKey, componentKey } = selectStore;
  const [activeKey, setActiveKey] = useState<string>(AttrEditTab.DATA);

  const handleSetActiveKey = (newTab: string) => {
    events.emit(EventEmitTypes.CHANGE_ATTR_EDIT_TAB, newTab, activeKey);
    setActiveKey(newTab);
  };

  useEffect(() => {
    events.on(EventEmitTypes.JUMP_ATTR_EDIT_TAB, handleSetActiveKey);
  }, []);

  useEffect(() => {
    if (selectType !== SelectType.HOTAREA) {
      setActiveKey(AttrEditTab.DATA);
    }
  }, [selectType]);

  const isChildrenEditing =
    selectType === SelectType.COMPONENT && containerComponentKey > -1 && componentKey === containerComponentKey;

  const title = useMemo(() => {
    switch (selectType) {
      case SelectType.GLOBAL:
        return i18n.t('Global Attributes');
      case SelectType.PAGE:
        return i18n.t('Page Attributes');
      case SelectType.COMPONENT:
        return i18n.t(isChildrenEditing ? 'Edit Children Components' : 'Component Configuration');
      case SelectType.PLUGIN:
        return i18n.t('Plugin Configuration');
      default:
        return i18n.t('Attributes Configuration');
    }
  }, [selectType, isChildrenEditing]);

  if (loading) {
    return <div className="vize-attributes-editor" />;
  }

  return (
    <div className={classnames(`vize-attributes-editor ${selectType}`)}>
      <p className="editor-title">{title}</p>

      {isChildrenEditing ? (
        <ChildrenComponentsEdit />
      ) : (
        <Tabs className="editor-prop-editor-tab" activeKey={activeKey} onChange={setActiveKey} animated>
          <TabPane
            key={AttrEditTab.DATA}
            tab={
              <div className="editor-prop-tab-item">
                <FiDatabase />
                <span>
                  &nbsp;<Trans>Data</Trans>
                </span>
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
                <span>
                  &nbsp;<Trans>Style</Trans>
                </span>
              </div>
            }
          >
            <StyleAttrsForm selectType={selectType} />
          </TabPane>

          <TabPane
            key={AttrEditTab.EVENTS}
            tab={
              <>
                <div className="editor-prop-tab-item">
                  <FiGrid />
                  <span>
                    &nbsp;<Trans>Event</Trans>
                  </span>
                </div>
                <Badge count={getEventCount()} size="small" />
              </>
            }
          >
            <EventAttrForm selectType={selectType} />
          </TabPane>
        </Tabs>
      )}
    </div>
  );
}

function getEventCount(): number {
  const { selectType } = selectStore;
  switch (selectType) {
    case SelectType.COMPONENT:
      return componentsStore.getCurrentComponentInstance()!.events.length;
    case SelectType.PLUGIN:
      return pluginsStore.getCurrentPluginInstance()!.events.length;
    case SelectType.HOTAREA:
      return hotAreaStore.getCurrentHotArea()!.events.length;
    case SelectType.GLOBAL:
      return globalStore.globalEvents.length;
    case SelectType.PAGE:
      return pagesStore.currentPage.events.length;
  }
}

export const AttributesEditor = memo(observer(IAttributesEditor));
