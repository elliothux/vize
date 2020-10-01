/* eslint-disable max-lines */
import * as React from 'react';
import { ComponentInstance, Maybe, WithReactChildren } from 'types';
import { ComponentView } from './ComponentView';
import { globalStore, SelectStore, selectStore, SelectType, materialsStore } from 'states';
import classNames from 'classnames';
import { ComponentMask } from './ComponentMask';
import { ComponentContextMenu, showComponentContextMenu } from '../ContextMenu/ComponentMenu';
import { LayoutRender } from '../LayoutRender';
import { setComponentNode, events, EventEmitTypes, withPreventEvent } from '../../utils';
import { ComponentSelectModeMask } from './ComponentSelectModeMask';
import { HotArea } from '../HotArea';
import { observer } from 'mobx-react';
import iframeStyle from './index.iframe.scss';

globalStore.setIframeStyle('ComponentItem', iframeStyle);

interface Props extends Pick<SelectStore, 'selectMode' | 'selectModeSelectedComponent'> {
  instance: ComponentInstance;
  currentSelectedType: SelectType;
  currentSelectedKey: number;
  currentSelectedContainerKey: number;
}

@observer
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

  private onSelectWithSelectMode = withPreventEvent(() => {
    const {
      instance: { key, parent },
    } = this.props;

    selectStore.setSelectModeSelectComponent({ key: key, parentKey: parent?.key });
  });

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
    selectStore.setSelectModeSelectComponent({ parentKey: instance.key });
  };

  private onClickMask = () => {
    selectStore.selectComponent(this.props.currentSelectedContainerKey);
    selectStore.selectContainerComponent(-1);
  };

  private onClickMaskWithSelectMode = () => {
    selectStore.setSelectModeSelectComponent({ key: selectStore.selectModeSelectedComponent?.key });
  };

  // TODO: refactor
  renderHotAreas(withHotAreas: boolean, selected: boolean, selectModeSelected: boolean) {
    const { instance, selectMode } = this.props;

    if (!instance?.hotAreas?.length) {
      return null;
    }

    const selectedHotAreaIndex = selectStore.hotAreaIndex;
    const previewMode = globalStore.previewMode;
    const meta = globalStore.metaInfo;

    const { hotAreas } = instance;

    return withHotAreas ? (
      <div
        className={classNames('editor-preview-component-hot-areas', {
          visible: selected,
          'select-mode-selected': selectModeSelected,
        })}
        onDoubleClick={selectMode ? undefined : this.onDoubleClick}
        onContextMenu={selectMode ? undefined : this.onContextMenu}
      >
        {(hotAreas || []).map((area, hotAreaIndex) => {
          return (
            <HotArea
              instance={instance}
              key={area.key}
              hotArea={area}
              selected={selected && hotAreaIndex === selectedHotAreaIndex}
              onClick={() => selectStore.selectHotArea(hotAreaIndex)}
              previewMode={previewMode}
              global={global}
              meta={meta}
            />
          );
        })}
      </div>
    ) : null;
  }

  render() {
    const {
      instance,
      instance: { key, hotAreas, component },
      currentSelectedKey,
      currentSelectedContainerKey,
      currentSelectedType,
      selectMode,
      selectModeSelectedComponent,
      children,
    } = this.props;

    const selected =
      (currentSelectedType === SelectType.COMPONENT || currentSelectedType === SelectType.HOTAREA) &&
      key === currentSelectedKey;
    const selectedWithSelectMode = selectModeSelectedComponent?.key === key;
    const selectedAsContainer = key === currentSelectedContainerKey || key === selectModeSelectedComponent?.parentKey;
    const withHotAreas = !!hotAreas && hotAreas.length > 0;
    const {
      info: { name },
      isContainer,
    } = materialsStore.getComponentMeta(component);
    const tag = `${name} (key=${key})`;
    const subTag = isContainer
      ? selectMode
        ? ' [双击选择子组件]'
        : ' [双击编辑容器]'
      : hotAreas
      ? ' [双击编辑热区]'
      : '';

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
          {selectMode ? (
            selectedAsContainer ? null : (
              <ComponentSelectModeMask
                instance={instance}
                selected={selectedWithSelectMode}
                onClick={this.onSelectWithSelectMode}
                onDoubleClick={this.onDoubleClickWithSelectMode}
              />
            )
          ) : withHotAreas ? null : (
            <ComponentMask
              tag={tag}
              subTag={subTag}
              instance={instance}
              selected={selected}
              onClick={this.onSelect}
              onDoubleClick={this.onDoubleClick}
              onContextMenu={this.onContextMenu}
            />
          )}

          <ComponentView
            instance={instance}
            HotAreas={this.renderHotAreas(withHotAreas, selected, selectedWithSelectMode)}
          >
            {children}
          </ComponentView>

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
