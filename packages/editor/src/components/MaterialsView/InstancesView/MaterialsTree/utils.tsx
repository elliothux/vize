import * as React from 'react';
import { ComponentProps } from 'react';
import { ComponentInstance, HotArea, PluginInstance } from 'types';
import { getMaterialsComponentMeta, getMaterialsPluginMeta } from 'runtime';
import { FiArchive, FiLayers, FiPackage, FiSquare } from 'react-icons/fi';
import { Tree } from 'antd';

const { DirectoryTree } = Tree;

export type TreeData = ComponentProps<typeof DirectoryTree>['treeData'];

export function generateComponentTreeData(componentInstances: ComponentInstance[], isChildren = false): TreeData {
  return componentInstances.reduce<TreeData>((accu, { key, children, component, hotAreas }) => {
    const meta = getMaterialsComponentMeta(component);
    if (!meta) {
      console.warn(`Materials component not found: "${component}"`);
      return accu;
    }

    const {
      info: { name },
    } = meta;
    const isContainer = !!children;
    const hasHotArea = !!hotAreas?.length;
    accu!.push({
      key,
      title: `${name} (key=${key})`,
      isLeaf: !(isContainer || hasHotArea),
      icon: isContainer || hasHotArea ? <FiArchive /> : <FiLayers />,
      children: isContainer
        ? generateComponentTreeData(children!, true)
        : hasHotArea
        ? generateHotAreaTreeData(key, hotAreas!)
        : undefined,
      className: isChildren ? 'child-component-tree-node' : 'component-tree-node',
    });

    return accu;
  }, []);
}

function generateHotAreaTreeData(componentKey: number, hotAreas: HotArea[]): TreeData {
  return hotAreas.map(({ key }, index) => {
    return {
      key: `hotarea-${componentKey}-${index}`,
      title: `热区（key=${key}）`,
      isLeaf: true,
      icon: <FiSquare />,
      className: 'child-hotarea-tree-node',
    };
  });
}

export function generatePluginTreeData(pluginInstances: PluginInstance[]): TreeData {
  return pluginInstances.reduce<TreeData>((accu, { key, plugin }) => {
    const meta = getMaterialsPluginMeta(plugin)!;
    if (!meta) {
      console.warn(`Materials plugin not found: "${plugin}"`);
      return accu;
    }

    const {
      info: { name },
    } = meta;

    accu!.push({
      key,
      title: `${name} (key=${key})`,
      isLeaf: true,
      icon: <FiPackage />,
    });

    return accu;
  }, []);
}
