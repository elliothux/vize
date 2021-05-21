import * as React from 'react';
import { ComponentProps } from 'react';
import { ComponentInstance, HotArea, PluginInstance } from 'types';
import { getMaterialsComponentMeta, getMaterialsPluginMeta } from 'runtime';
import { FiArchive, FiLayers, FiPackage, FiSquare } from 'react-icons/fi';
import { Tree } from 'antd';
import { i18n } from 'i18n';
import classnames from 'classnames';

const { DirectoryTree } = Tree;

export type TreeData = ComponentProps<typeof DirectoryTree>['treeData'];

export function generateComponentTreeData(
  deep: number,
  componentInstances: ComponentInstance[],
  isChildren: boolean,
  selectModeSelectedComponent?: number,
): TreeData {
  return componentInstances.reduce<TreeData>((accu, { key, children, component, hotAreas }) => {
    const {
      info: { name },
    } = getMaterialsComponentMeta(component)!;

    const isContainer = !!children;
    const hasHotArea = !!hotAreas?.length;
    accu!.push({
      key,
      title: `${name} (key=${key})`,
      isLeaf: !(isContainer || hasHotArea),
      icon: isContainer || hasHotArea ? <FiArchive /> : <FiLayers />,
      children: isContainer
        ? generateComponentTreeData(deep + 1, children!, true, selectModeSelectedComponent)
        : hasHotArea
        ? generateHotAreaTreeData(deep + 1, key, hotAreas!)
        : undefined,
      className: classnames(`${isChildren ? 'child-component-tree-node' : 'component-tree-node'} deep-${deep}`, {
        'selected-mode-selected': selectModeSelectedComponent === key,
      }),
    });

    return accu;
  }, []);
}

function generateHotAreaTreeData(deep: number, componentKey: number, hotAreas: HotArea[]): TreeData {
  return hotAreas.map(({ key }, index) => {
    return {
      key: `hotarea-${componentKey}-${index}`,
      title: `${i18n.t('Hotarea')}（key=${key}）`,
      isLeaf: true,
      icon: <FiSquare />,
      className: `child-hotarea-tree-node deep-${deep}`,
    };
  });
}

export function generatePluginTreeData(pluginInstances: PluginInstance[]): TreeData {
  return pluginInstances.reduce<TreeData>((accu, { key, plugin }) => {
    const {
      info: { name },
    } = getMaterialsPluginMeta(plugin)!;

    accu!.push({
      key,
      title: `${name} (key=${key})`,
      isLeaf: true,
      icon: <FiPackage />,
    });

    return accu;
  }, []);
}
