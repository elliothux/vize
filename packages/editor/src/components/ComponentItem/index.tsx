import * as React from 'react';
import { ComponentInstance, Maybe, PageInstance, PositionStyle, WithReactChildren } from 'types';
import { editStore, SelectStore, selectStore, SelectType } from 'states';
import { withPreventEvent } from 'utils';
import { events, EventEmitTypes } from 'libs';
import { contextMenu } from 'react-contexify';
import {
  deleteComponentNode,
  setComponentNode,
  deleteComponentSelectedCallback,
  calcPosition,
  getMaterialsComponentMeta,
} from 'runtime';
import { ComponentContextMenu, showComponentContextMenu } from 'components/ContextMenu';
import classNames from 'classnames';
import { ComponentMask } from './ComponentMask';
import { LayoutRender } from '../LayoutRender';
import { ComponentSelectModeMask } from './ComponentSelectModeMask';
import { ComponentHotAreas } from './ComponentHotAreas';
import { ComponentView } from './ComponentView';
import { ComponentInjectedStyle } from './ComponentInjectedStyle';
import iframeStyle from './index.iframe.scss';

editStore.setIframeStyle('ComponentItem', iframeStyle);

interface Props extends Pick<SelectStore, 'selectMode' | 'selectModeSelectedComponent'> {
  instance: ComponentInstance;
  currentSelectedType: SelectType;
  currentSelectedKey: number;
  currentSelectedContainerKey: number;
  isCurrentSelectedContainerShared: boolean;
  pages: PageInstance[];
  currentPageIndex: number;
}

export class ComponentItem extends React.Component<WithReactChildren<Props>> {
  private refNode: Maybe<HTMLDivElement> = null;

  private get hideEditMask(): Maybe<boolean> {
    return getMaterialsComponentMeta(this.props.instance.component)!.hideEditMask;
  }

  public componentWillUnmount() {
    const { key, children } = this.props.instance;
    if (children?.length) {
      children.forEach(({ key }) => deleteComponentNode(key));
    }
    deleteComponentNode(key);
    deleteComponentSelectedCallback(key);
  }

  private setRef = (node: HTMLDivElement) => {
    this.refNode = node;
    setComponentNode(this.props.instance.key, node);
  };

  private onSelect = withPreventEvent(() => {
    const {
      instance: { key, shared, parent },
    } = this.props;
    selectStore.selectComponent(shared, key, parent?.key);
    setTimeout(() => contextMenu.hideAll(), 0);
  });

  private onSelectWithSelectMode = withPreventEvent(() => {
    const {
      instance: { key, parent },
    } = this.props;

    selectStore.setSelectModeSelectComponent({ key: key, parentKey: parent?.key });
  });

  private onContextMenu = (e: React.MouseEvent) => {
    const { key, shared, parent } = this.props.instance;
    showComponentContextMenu(e, shared, true, key, parent?.key);
  };

  private onDoubleClick = () => {
    const { instance } = this.props;

    if (instance.hotAreas) {
      return events.emit(EventEmitTypes.MANAGE_HOT_AREA, instance);
    }

    if (instance.children) {
      return selectStore.selectContainerComponent(instance.key);
    }
  };

  private onDoubleClickWithSelectMode = () => {
    const { instance } = this.props;
    if (!instance.children) {
      return null;
    }
    selectStore.setSelectModeSelectComponent({ parentKey: instance.key });
  };

  private onClickMask = () => {
    const { currentSelectedContainerKey, isCurrentSelectedContainerShared } = this.props;
    selectStore.selectComponent(isCurrentSelectedContainerShared, currentSelectedContainerKey);
    selectStore.selectContainerComponent(-1);
  };

  private onClickMaskWithSelectMode = () => {
    selectStore.setSelectModeSelectComponent(null);
  };

  public render() {
    const {
      instance,
      instance: { key, commonStyle },
      currentSelectedKey,
      currentSelectedContainerKey,
      currentSelectedType,
      selectMode,
      selectModeSelectedComponent,
      pages,
      currentPageIndex,
      children,
    } = this.props;

    const selected =
      (currentSelectedType === SelectType.COMPONENT || currentSelectedType === SelectType.HOTAREA) &&
      key === currentSelectedKey;
    const selectedWithSelectMode = selectModeSelectedComponent?.key === key;
    const selectedAsContainer =
      (!selectMode && key === currentSelectedContainerKey) ||
      (selectMode && key === selectModeSelectedComponent?.parentKey);

    if (!children && instance.children) {
      return <LayoutRender componentInstances={instance.children} containerComponentInstance={instance} />;
    }

    let mask = null;
    if (!this.hideEditMask) {
      if (selectMode) {
        console.log(key, selectedAsContainer);
        mask = selectedAsContainer ? null : (
          <ComponentSelectModeMask
            instance={instance}
            selected={selectedWithSelectMode}
            onClick={this.onSelectWithSelectMode}
            onDoubleClick={this.onDoubleClickWithSelectMode}
          />
        );
      } else {
        mask = (
          <ComponentMask
            instance={instance}
            selected={selected}
            onClick={this.onSelect}
            onDoubleClick={this.onDoubleClick}
            onContextMenu={this.onContextMenu}
          >
            <ComponentHotAreas instance={instance} />
          </ComponentMask>
        );
      }
    }

    const position = commonStyle.position as PositionStyle;
    return (
      <>
        <div
          ref={this.setRef}
          className={classNames('vize-component-item', {
            selected,
            'selected-with-select-mode': selectedWithSelectMode,
            'selected-as-container': selectedAsContainer,
            'hide-edit-mask': this.hideEditMask,
          })}
          data-key={key}
          style={position ? calcPosition(position) : undefined}
        >
          <ComponentContextMenu instance={instance} pages={pages} currentPageIndex={currentPageIndex} />
          <ComponentView instance={instance}>{children}</ComponentView>
          <ComponentInjectedStyle instance={instance} />
          {mask}
        </div>

        {selectedAsContainer && !this.hideEditMask ? (
          <div
            className="vize-container-edit-mode-mask"
            onClick={selectMode ? this.onClickMaskWithSelectMode : this.onClickMask}
          />
        ) : null}
      </>
    );
  }
}
