import './index.scss';
import * as React from 'react';

interface Props {
    title: string;
    children?: React.ReactChildren;
}

export default function ContainerWithTitle({ title = 'Empty', children }: Props) {
    return (
        <div className="vize-materials-universal container_with_title">
            <h1>{title}</h1>
            {children}
        </div>
    );
}
