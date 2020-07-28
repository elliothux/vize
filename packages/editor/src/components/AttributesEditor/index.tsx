import * as React from 'react';
import { useMemo } from 'react';
import { observer } from 'mobx-react';
import './index.scss';
import { componentsStore, materialsStore, pluginsStore, selectStore, SelectType } from '../../states';
import { MaterialsForm, Maybe } from '../../types';
import { SchemaForm } from '../Form';
import { toJS } from 'mobx';

interface Props {
    loading: boolean;
}

function IAttributesEditor({ loading }: Props) {
    const { selectType, componentKey, pluginKey } = selectStore;

    const { dataForm, styleForm, instanceKey } = useMemo(() => {
        return loading
            ? { dataForm: null, styleForm: null, instanceKey: null }
            : getDataForm(selectType, componentKey, pluginKey);
    }, [selectType, componentKey, pluginKey, loading]);

    if (loading) {
        return null;
    }

    let content: Maybe<React.ReactElement>;
    if (selectType === SelectType.COMPONENT) {
        const { data, style } = getComponentData(componentKey);
        content = (
            <>
                {dataForm ? (
                    <SchemaForm
                        instanceKey={instanceKey!}
                        form={dataForm}
                        data={data}
                        onChange={componentsStore.setCurrentComponentInstanceData}
                    />
                ) : null}
                {styleForm ? (
                    <SchemaForm
                        instanceKey={instanceKey!}
                        form={styleForm}
                        data={style}
                        onChange={componentsStore.setCurrentComponentInstanceStyle}
                    />
                ) : null}
            </>
        );
    } else if (selectType === SelectType.PLUGIN) {
        const data = getPluginData(pluginKey);
        content = (
            <>
                {dataForm ? (
                    <SchemaForm
                        instanceKey={instanceKey!}
                        form={dataForm}
                        data={data}
                        onChange={pluginsStore.setPluginData}
                    />
                ) : null}
            </>
        );
    } else {
        // TODO
        content = null;
    }

    return <div className="vize-attributes-editor">{content}</div>;
}

export const AttributesEditor = observer(IAttributesEditor);

function getDataForm(
    selectType: SelectType,
    componentKey: number,
    pluginKey: number,
): {
    dataForm: Maybe<MaterialsForm>;
    styleForm: Maybe<MaterialsForm>;
    instanceKey: Maybe<number>;
} {
    switch (selectType) {
        case SelectType.PAGE: {
            // TODO
            return { dataForm: null, styleForm: null, instanceKey: null };
        }
        case SelectType.COMPONENT: {
            const { component } = componentsStore.getCurrentPageComponentInstance(componentKey);
            const { dataForm, styleForm } = materialsStore.getComponentMeta(component);
            return { dataForm, styleForm, instanceKey: componentKey };
        }
        case SelectType.PLUGIN: {
            const { plugin } = pluginsStore.getPluginInstance(pluginKey);
            const { dataForm } = materialsStore.getPluginMeta(plugin);
            return { dataForm, styleForm: null, instanceKey: pluginKey };
        }
    }
}

function getComponentData(componentKey: number) {
    const { data, style } = componentsStore.getCurrentPageComponentInstance(componentKey);
    return { data: toJS(data), style: toJS(style) };
}

function getPluginData(pluginKey: number) {
    const { data } = pluginsStore.getPluginInstance(pluginKey);
    return toJS(data);
}
