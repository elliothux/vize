import './index.scss';
import * as React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import { useEffect, useMemo, useState } from 'react';
import { selectStore, SelectType } from 'states';
import { EventEmitTypes, events } from 'utils';
import { Tabs } from 'antd';
import { FiDatabase, FiFeather, FiGrid } from 'react-icons/fi';
import { i18n } from 'i18n';
import { Trans } from 'react-i18next';
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
        return i18n.t('Global Configuration');
      case SelectType.COMPONENT:
        return i18n.t('Component Configuration');
      case SelectType.PLUGIN:
        return i18n.t('Plugin Configuration');
      default:
        return i18n.t('Attributes Configuration');
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
              <span>
                &nbsp;<Trans>data</Trans>
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
                &nbsp;<Trans>style</Trans>
              </span>
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
              <span>
                &nbsp;<Trans>event</Trans>
              </span>
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
