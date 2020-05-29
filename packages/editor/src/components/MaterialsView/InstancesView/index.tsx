import * as React from 'react';
import { PagesList } from './PagesList';
import { MaterialsTree } from './MaterialsTree';

export function InstancesView() {
    return (
        <>
            <PagesList />
            <MaterialsTree />
        </>
    );
}
