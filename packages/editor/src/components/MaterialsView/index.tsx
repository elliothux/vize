import * as React from 'react';
import { InstancesView } from './InstancesView';
import { ComponentsLibrary, PluginsLibrary } from './MaterialsLibrary';
import { EventEmitTypes, events } from 'utils';
import { MaterialsViewType } from './HeaderOptions';
import './index.scss';

interface Props {
    loading: boolean;
}

export class MaterialsView extends React.Component<Props> {
    public state = {
        view: MaterialsViewType.COMPONENTS,
    };

    private onSetView = (view: MaterialsViewType) => {
        this.setState({ view });
    };

    public componentDidMount(): void {
        events.on(EventEmitTypes.SET_MATERIALS_VIEW_TYPE, this.onSetView);
    }

    public componentWillUnmount(): void {
        events.cancel(EventEmitTypes.SET_MATERIALS_VIEW_TYPE, this.onSetView);
    }

    public render() {
        const { view } = this.state;

        let content: React.ReactNode = null;
        if (!this.props.loading) {
            switch (view) {
                case MaterialsViewType.COMPONENTS:
                    content = <ComponentsLibrary />;
                    break;
                case MaterialsViewType.PLUGINS:
                    content = <PluginsLibrary />;
                    break;
                case MaterialsViewType.INSTANCES:
                    content = <InstancesView />;
                    break;
            }
        }

        return <div className="vize-materials-view">{content}</div>;
    }
}
