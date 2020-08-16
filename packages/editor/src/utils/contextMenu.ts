import * as React from 'react';
import { contextMenu } from 'react-contexify';
import { preventSyntheticEvent } from './common';

export function showContextMenu(event: React.MouseEvent | MouseEvent, key: string) {
  preventSyntheticEvent(event);

  return contextMenu.show({
    id: key,
    event,
  });
}
