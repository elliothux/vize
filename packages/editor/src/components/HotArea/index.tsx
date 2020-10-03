import './index.scss';
import * as React from 'react';
import classnames from 'classnames';
import { ComponentInstance, HotArea as IHotArea, GlobalMeta } from 'types';
import { noop, percent, preventSyntheticEvent } from 'utils';
import { HotAreaEventProxy } from '../HotAreaEventProxy';
import { EventEmitTypes, events } from 'utils';
import { AttrEditTab } from '../AttributesEditor';

interface Props {
  instance: ComponentInstance;
  hotArea: IHotArea;
  onClick: () => void;
  selected: boolean;
  previewMode: boolean;
  meta: GlobalMeta;
  global: object;
}

function HotArea({ instance, hotArea, onClick, selected, previewMode, meta, global }: Props) {
  const { size, position, key } = hotArea;
  const handleClick = previewMode
    ? noop
    : (e: React.SyntheticEvent<HTMLDivElement>) => {
        preventSyntheticEvent(e);
        events.emit(EventEmitTypes.JUMP_ATTR_EDIT_TAB, AttrEditTab.EVENTS);
        onClick();
      };

  return (
    <HotAreaEventProxy
      instance={instance}
      previewMode={previewMode}
      hotArea={hotArea}
      meta={meta}
      global={global}
      style={{
        width: percent(size.width),
        height: percent(size.height),
        left: percent(position.x),
        top: percent(position.y),
      }}
    >
      <div className={classnames('editor-preview-component-hot-area', { selected })} onClick={handleClick}>
        <p className="editor-preview-component-hot-area--text">热区（key={key}）</p>
      </div>
    </HotAreaEventProxy>
  );
}

export { HotArea };
