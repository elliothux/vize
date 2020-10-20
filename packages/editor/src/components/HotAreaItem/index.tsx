import './index.scss';
import * as React from 'react';
import { useCallback } from 'react';
import { globalStore, selectStore } from 'states';
import classnames from 'classnames';
import { HotArea } from 'types';
import { percent, preventSyntheticEvent } from 'utils';
import { EventEmitTypes, events } from 'utils';
import { AttrEditTab } from '../AttributesEditor';
import { observer } from 'mobx-react';

interface Props {
  index: number;
  componentInstanceKey: number;
  hotArea: HotArea;
}

function IHotAreaItem({ index, componentInstanceKey, hotArea }: Props) {
  const { componentKey, hotAreaIndex } = selectStore;
  const { previewMode } = globalStore;

  const selected = componentKey === componentInstanceKey && index === hotAreaIndex;
  const onClick = useCallback(
    (e: React.SyntheticEvent<HTMLDivElement>) => {
      if (previewMode) {
        return;
      }
      preventSyntheticEvent(e);
      events.emit(EventEmitTypes.JUMP_ATTR_EDIT_TAB, AttrEditTab.EVENTS);
      selectStore.selectHotArea(index, componentInstanceKey);
    },
    [previewMode],
  );

  const { size, position, key } = hotArea;
  return (
    <div
      className={classnames('vize-component-item-hotarea', { selected })}
      onClick={onClick}
      style={{
        width: percent(size.width),
        height: percent(size.height),
        left: percent(position.x),
        top: percent(position.y),
      }}
    >
      <p>热区（key={key}）</p>
    </div>
  );
}

export const HotAreaItem = observer(IHotAreaItem);
