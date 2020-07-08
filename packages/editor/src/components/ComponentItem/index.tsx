import * as React from 'react';
import { ComponentInstance } from 'types';
import { ComponentView } from './ComponentView';
import { globalStore, selectStore } from 'states';
import classNames from 'classnames';
import { ComponentMask } from './ComponentMask';
import { ComponentContextMenu, showComponentContextMenu } from '../ContextMenu/ComponentMenu';
import { setComponentNode } from '../../utils';

import iframeStyle from './index.iframe.scss';
import { ContainerComponentView } from './ContainerComponentView';

globalStore.setIframeStyle('ComponentItem', iframeStyle);

export interface ComponentItemProps {
    instance: ComponentInstance;
    currentSelectedKey: number;
    containerEditMode: boolean;
}

export class ComponentItem extends React.Component<ComponentItemProps> {
    private setRef = (node: HTMLDivElement) => {
        setComponentNode(this.props.instance.key, node);
    };

    private onSelect = () => {
        const {
            instance: { key },
        } = this.props;

        selectStore.selectComponent(key);
    };

    private onContextMenu = (e: React.MouseEvent) => {
        showComponentContextMenu(e, this.props.instance.key, true);
    };

    private onDoubleClick = () => {
        if (!this.props.instance.children) {
            return null;
        }
        globalStore.setContainerEditMode(true);
    };

    private onClickMask = () => {
        globalStore.setContainerEditMode(false);
    };

    render() {
        const { instance, currentSelectedKey, containerEditMode } = this.props;
        const selected = instance.key === currentSelectedKey;

        return (
            <>
                <div
                    ref={this.setRef}
                    className={classNames('vize-component-item', {
                        selected,
                        'container-edit-mode': containerEditMode,
                    })}
                    data-key={instance.key}
                    onDoubleClick={this.onDoubleClick}
                >
                    {instance.children ? (
                        React.createElement(ContainerComponentView, this.props)
                    ) : (
                        <ComponentView instance={instance} />
                    )}
                    <ComponentMask
                        instance={instance}
                        selected={selected}
                        onClick={this.onSelect}
                        onContextMenu={this.onContextMenu}
                    />
                    <ComponentContextMenu instance={instance} />
                </div>
                {containerEditMode && selected ? (
                    <div
                        className="vize-container-edit-mode-mask"
                        style={{ display: containerEditMode ? 'block' : 'none' }}
                        onClick={this.onClickMask}
                    />
                ) : null}
            </>
        );
    }
}
