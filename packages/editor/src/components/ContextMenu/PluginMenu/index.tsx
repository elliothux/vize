import * as React from 'react';
import { FiDelete } from 'react-icons/fi';
import { Menu, Item, theme, animation } from 'react-contexify';
import { useCallback } from 'react';
import { pluginsStore, selectStore } from 'states';
import { preventSyntheticEvent, showContextMenu } from 'utils';
import { PluginInstance } from 'types';

interface Props {
  instance: PluginInstance;
}

export function PluginContextMenu({ instance }: Props) {
  const deps = [instance.key];
  const onDelete = useCallback(() => pluginsStore.deletePluginInstance(instance.key), deps);

  return (
    <Menu id={getID(instance.key)} theme={theme.dark} animation={animation.fade}>
      <Item onClick={onDelete}>
        <FiDelete />
        <span>删除</span>
      </Item>
    </Menu>
  );
}

export function showPluginContextMenu(e: React.MouseEvent, pluginKey: number) {
  preventSyntheticEvent(e);
  selectStore.selectPlugin(pluginKey);
  return showContextMenu(e, getID(pluginKey));
}

function getID(componentKey: number) {
  return `plugin-${componentKey}`;
}
