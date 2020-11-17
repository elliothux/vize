import * as React from 'react';
import { contextMenu } from 'react-contexify';

export function showContextMenu(event: React.MouseEvent | MouseEvent, key: string) {
  return contextMenu.show({
    id: key,
    event,
  });
}
