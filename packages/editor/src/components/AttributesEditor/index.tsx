import * as React from 'react';
import { observer } from 'mobx-react';
import './index.scss';

interface Props {
    loading: boolean;
}

@observer
export class AttributesEditor extends React.Component<Props> {
    public render() {
        return <div className="vize-attributes-editor">vize-attributes-editor</div>;
    }
}
