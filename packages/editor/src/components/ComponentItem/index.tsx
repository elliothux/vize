/* eslint-disable max-lines */
import * as React from 'react';
import { ComponentInstance, Maybe, PageInstance, WithReactChildren } from 'types';
import { ComponentView } from './ComponentView';
import { editStore, SelectStore, selectStore, SelectType } from 'states';
import { events, EventEmitTypes, withPreventEvent } from 'utils';
import classNames from 'classnames';
import { deleteComponentNode, setComponentNode } from 'runtime';
import { ComponentContextMenu, showComponentContextMenu } from 'components/ContextMenu';
import { ComponentMask } from './ComponentMask';
import { LayoutRender } from '../LayoutRender';
import { ComponentSelectModeMask } from './ComponentSelectModeMask';
import iframeStyle from './index.iframe.scss';
import { ComponentHotAreas } from './ComponentHotAreas';

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

  public componentWillUnmount() {
    const { key, children } = this.props.instance;
    if (children?.length) {
      children.forEach(({ key }) => deleteComponentNode(key));
    }
    deleteComponentNode(key);
  }

  private setRef = (node: HTMLDivElement) => {
    this.refNode = node;
    setComponentNode(this.props.instance.key, node);
  };

  private onSelect = () => {
    const {
      instance: { key, shared },
    } = this.props;

    selectStore.selectComponent(shared, key);
  };

  private onSelectWithSelectMode = withPreventEvent(() => {
    const {
      instance: { key, parent },
    } = this.props;

    selectStore.setSelectModeSelectComponent({ key: key, parentKey: parent?.key });
  });

  private onContextMenu = (e: React.MouseEvent) => {
    const { key, shared } = this.props.instance;
    showComponentContextMenu(e, shared, key, true);
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
    selectStore.setSelectModeSelectComponent({ key: selectStore.selectModeSelectedComponent?.key });
  };

  public render() {
    const {
      instance,
      instance: { key },
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
            >
              <ComponentHotAreas instance={instance} />
            </ComponentMask>
          )}

          <ComponentContextMenu instance={instance} pages={pages} currentPageIndex={currentPageIndex} />
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
