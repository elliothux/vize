import './index.scss';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { globalStore, selectStore } from 'states';
import classnames from 'classnames';
import { FirstParameter, HotArea } from 'types';
import { percent, preventSyntheticEvent } from 'utils';
import { EventEmitTypes, events } from 'utils';
import { AttrEditTab } from '../AttributesEditor';
import { observer } from 'mobx-react';
import { NodeEventProxy } from 'runtime/comppnents/NodeEventProxy';
import { showHotAreaContextMenu } from '../ContextMenu/HotAreaContextMenu';

interface Props {
  index: number;
  componentInstanceKey: number;
  hotArea: HotArea;
}

function IHotAreaItem({ index, componentInstanceKey, hotArea }: Props) {
  const { componentKey, hotAreaIndex } = selectStore;
  const { previewMode } = globalStore;

  const selected = componentKey === componentInstanceKey && index === hotAreaIndex;
  const onClick = useCallback((e: React.SyntheticEvent<HTMLDivElement>) => {
    if (previewMode) {
      return;
    }
    preventSyntheticEvent(e);
    events.emit(EventEmitTypes.JUMP_ATTR_EDIT_TAB, AttrEditTab.EVENTS);
    selectStore.selectHotArea(index, componentInstanceKey);
  }, []);

  const onContextMenu = useCallback(
    (e: FirstParameter<typeof showHotAreaContextMenu>) => {
      showHotAreaContextMenu(e, index, componentInstanceKey, true);
    },
    [index, componentInstanceKey],
  );

  const { size, position, key } = hotArea;
  const style = useMemo(
    () => ({
      width: percent(size.width),
      height: percent(size.height),
      left: percent(position.x),
      top: percent(position.y),
    }),
    [size, position],
  );

  if (previewMode) {
    return (
      <NodeEventProxy<HotArea>
        className="hotarea-event-proxy"
        childrenType="hotarea"
        instance={hotArea}
        style={style}
        global={globalStore.globalProps}
        meta={globalStore.metaInfo}
        previewMode={globalStore.previewMode}
      />
    );
  }

  return (
    <div
      className={classnames('vize-component-item-hotarea', { selected })}
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={style}
    >
      <p>热区（key={key}）</p>
    </div>
  );
}

export const HotAreaItem = observer(IHotAreaItem);
