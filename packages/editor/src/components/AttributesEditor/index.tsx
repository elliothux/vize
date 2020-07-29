import './index.scss';
import * as React from 'react';
import { observer } from 'mobx-react';
import { selectStore, SelectType } from 'states';
import { Maybe } from 'types';
import { ComponentForm } from './ComponentForm';
import { PluginForm } from './PluginForm';

interface Props {
    loading: boolean;
}

function IAttributesEditor({ loading }: Props) {
    const { selectType } = selectStore;

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

    return <div className="vize-attributes-editor">{content}</div>;
}

export const AttributesEditor = observer(IAttributesEditor);
