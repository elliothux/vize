import './index.scss';
import * as React from 'react';
import { ComponentsTree } from './ComponentsTree';
import { PluginsTree } from './PluginsTree';
import { GlobalProps } from './GlobalProps';
import { PageProps } from './PageProps';

export function MaterialsTree() {
  return (
    <div className="vize-materials-tree">
      <GlobalProps />
      <PageProps />
      <ComponentsTree shared />
      <ComponentsTree />
      <PluginsTree />
    </div>
  );
}
