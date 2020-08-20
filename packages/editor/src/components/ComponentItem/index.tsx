import * as React from 'react';
import { ComponentInstance, Maybe, WithReactChildren } from 'types';
import { ComponentView } from './ComponentView';
import { globalStore, selectStore, SelectType } from 'states';
import classNames from 'classnames';
import { ComponentMask } from './ComponentMask';
import { ComponentContextMenu, showComponentContextMenu } from '../ContextMenu/ComponentMenu';
import { LayoutRender } from '../LayoutRender';
import { setComponentNode, events, EventEmitTypes } from '../../utils';

import iframeStyle from './index.iframe.scss';
import { ComponentSelectModeMask } from './ComponentSelectModeMask';

globalStore.setIframeStyle('ComponentItem', iframeStyle);

interface Props extends Pick<typeof globalStore, 'selectMode' | 'selectModeSelectedComponent'> {
  instance: ComponentInstance;
  currentSelectedType: SelectType;
  currentSelectedKey: number;
  currentSelectedContainerKey: number;
}

export class ComponentItem extends React.Component<WithReactChildren<Props>> {
  private refNode: Maybe<HTMLDivElement> = null;

  private setRef = (node: HTMLDivElement) => {
    this.refNode = node;
    setComponentNode(this.props.instance.key, node);
  };

  private onSelect = () => {
    const {
      instance: { key },
    } = this.props;

    selectStore.selectComponent(key);
  };

  private onSelectWithSelectMode = () => {
    const {
      instance: { key, parent },
    } = this.props;

    globalStore.setSelectModeSelectComponent({ key: key, parentKey: parent?.key });
  };

  private onContextMenu = (e: React.MouseEvent) => {
    showComponentContextMenu(e, this.props.instance.key, true);
  };

  private onDoubleClick = () => {
    const { instance } = this.props;
    if (instance.hotAreas) {
      events.emit(EventEmitTypes.MANAGE_HOT_AREA, instance);
      return;
    }
    if (!instance.children) {
      return null;
    }
    selectStore.selectContainerComponent(instance.key);
  };

  private onDoubleClickWithSelectMode = () => {
    const { instance } = this.props;
    if (!instance.children) {
      return null;
    }
    globalStore.setSelectModeSelectComponent({ parentKey: instance.key });
  };

  private onClickMask = () => {
    selectStore.selectComponent(this.props.currentSelectedContainerKey);
    selectStore.selectContainerComponent(-1);
  };

  private onClickMaskWithSelectMode = () => {
    globalStore.setSelectModeSelectComponent({ key: globalStore.selectModeSelectedComponent?.key });
  };

  render() {
    const {
      instance,
      instance: { key },
      currentSelectedKey,
      currentSelectedContainerKey,
      currentSelectedType,
      selectMode,
      selectModeSelectedComponent,
      children,
    } = this.props;
    const selected = currentSelectedType === SelectType.COMPONENT && key === currentSelectedKey;
    const selectedWithSelectMode = selectModeSelectedComponent?.key === key;
    const selectedAsContainer = key === currentSelectedContainerKey || key === selectModeSelectedComponent?.parentKey;

    if (!children && instance.children) {
      return <LayoutRender componentInstances={instance.children} containerComponentInstance={instance} />;
    }

    return (
      <>
        <div
          ref={this.setRef}
          className={classNames('vize-component-item', {
            selected,
            'selected-with-select-mode': selectedWithSelectMode,
            'selected-as-container': selectedAsContainer,
          })}
          data-key={key}
        >
          <ComponentView instance={instance}>{children}</ComponentView>

          {selectMode ? (
            selectedAsContainer ? null : (
              <ComponentSelectModeMask
                instance={instance}
                selected={selectedWithSelectMode}
                onClick={this.onSelectWithSelectMode}
                onDoubleClick={this.onDoubleClickWithSelectMode}
              />
            )
          ) : (
            <ComponentMask
              instance={instance}
              selected={selected}
              onClick={this.onSelect}
              onDoubleClick={this.onDoubleClick}
              onContextMenu={this.onContextMenu}
            />
          )}

          <ComponentContextMenu instance={instance} />
        </div>

        {selectedAsContainer ? (
          <div
            className="vize-container-edit-mode-mask"
            onClick={selectMode ? this.onClickMaskWithSelectMode : this.onClickMask}
          />
        ) : null}
      </>
    );
  }
}
