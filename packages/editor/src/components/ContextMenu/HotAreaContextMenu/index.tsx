import * as React from 'react';
import { FiDelete } from 'react-icons/fi';
import { animation, Item, Menu, theme } from 'react-contexify';
import { hotAreaStore, selectStore } from 'states';
import { preventSyntheticEvent, showContextMenu } from 'utils';
import { HotArea } from '@vize/types';
import { useCallback } from 'react';
import { Trans } from 'react-i18next';
import { createMouseEventFromIframe } from '../utils';

interface Props {
  index: number;
  instance: HotArea;
}

export function HotAreaContextMenu({ index, instance: { parent } }: Props) {
  const onDelete = useCallback(() => hotAreaStore.deleteHotArea(parent.key, index), [parent.key, index]);

  return (
    <Menu id={getID(parent.key, index)} theme={theme.dark} animation={animation.fade}>
      <Item onClick={onDelete}>
        <FiDelete />
        <span>
          <Trans>delete</Trans>
        </span>
      </Item>
    </Menu>
  );
}

export function showHotAreaContextMenu(e: React.MouseEvent, index: number, componentKey: number, fromIFrame = false) {
  preventSyntheticEvent(e);
  if (selectStore.selectMode) {
    return;
  }
  selectStore.selectHotArea(index, componentKey);
  return showContextMenu(fromIFrame ? createMouseEventFromIframe(e) : e, getID(componentKey, index));
}

function getID(componentKey: number, index: number) {
  return `hotarea-${componentKey}-${index}`;
}
