import * as React from 'react';
import { ComponentsTree } from './ComponentsTree';
import { PluginsTree } from './PluginsTree';

import './index.scss';
import { GlobalProps } from './GlobalProps';

export function MaterialsTree() {
    return (
        <div className="vize-materials-tree">
            <GlobalProps />
            <ComponentsTree />
            <PluginsTree />
        </div>
    );
}
