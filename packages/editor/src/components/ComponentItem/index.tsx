import * as React from 'react';
import { ComponentInstance, Maybe, WithReactChildren } from 'types';
import { ComponentView } from './ComponentView';
import { globalStore, selectStore } from 'states';
import classNames from 'classnames';
import { ComponentMask } from './ComponentMask';
import { ComponentContextMenu, showComponentContextMenu } from '../ContextMenu/ComponentMenu';
import { LayoutRender } from '../LayoutRender';
import { setComponentNode } from '../../utils';

import iframeStyle from './index.iframe.scss';

globalStore.setIframeStyle('ComponentItem', iframeStyle);

export interface ComponentItemProps extends WithReactChildren {
    instance: ComponentInstance;
    currentSelectedKey: number;
    currentSelectedContainerKey: number;
}

export class ComponentItem extends React.Component<ComponentItemProps> {
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

    private onContextMenu = (e: React.MouseEvent) => {
        showComponentContextMenu(e, this.props.instance.key, true);
    };

    private onDoubleClick = () => {
        const { instance } = this.props;
        if (!instance.children) {
            return null;
        }
        selectStore.selectContainerComponent(instance.key);
    };

    private onClickMask = () => {
        selectStore.selectComponent(this.props.currentSelectedContainerKey);
        selectStore.selectContainerComponent(-1);
    };

    render() {
        const { instance, currentSelectedKey, currentSelectedContainerKey, children } = this.props;
        const selected = instance.key === currentSelectedKey;
        const selectedAsContainer = instance.key === currentSelectedContainerKey;

        if (!children && instance.children) {
            return (
                <LayoutRender
                    mountTarget={this.refNode!}
                    componentInstances={instance.children}
                    containerComponentInstance={instance}
                />
            );
        }

        return (
            <>
                <div
                    ref={this.setRef}
                    className={classNames('vize-component-item', {
                        selected,
                        'selected-as-container': selectedAsContainer,
                    })}
                    data-key={instance.key}
                    onDoubleClick={this.onDoubleClick}
                >
                    <ComponentView instance={instance}>{children}</ComponentView>
                    <ComponentMask
                        instance={instance}
                        selected={selected}
                        onClick={this.onSelect}
                        onContextMenu={this.onContextMenu}
                    />
                    <ComponentContextMenu instance={instance} />
                </div>

                {selectedAsContainer ? (
                    <div className="vize-container-edit-mode-mask" onClick={this.onClickMask} />
                ) : null}
            </>
        );
    }
}
