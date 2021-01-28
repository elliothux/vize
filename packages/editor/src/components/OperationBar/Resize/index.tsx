import './index.scss';
import * as React from 'react';
import classnames from 'classnames';
import { MdTabletMac, MdLaptop, MdPhoneIphone } from 'react-icons/md';
import { Tooltip } from 'antd';
import {
  desktopNames,
  desktops,
  DeviceItem,
  phoneNames,
  phones,
  tabletNames,
  tablets,
} from 'components/Simulator/devices';
import { editStore } from 'states';
import { observer } from 'mobx-react';

function IEditorResize() {
  const [name] = editStore.device;

  return (
    <div className="editor-resize">
      <Tooltip
        title={phones.map(i => (
          <ResizeItem currentName={name} item={i} key={i[0]} />
        ))}
        placement="bottomRight"
        overlayClassName="editor-resize-items"
        arrowPointAtCenter
      >
        <div
          key="phone"
          className={phoneNames.includes(name) ? 'selected' : ''}
          onClick={() => editStore.setDevice(phones[0])}
        >
          <MdPhoneIphone />
        </div>
      </Tooltip>

      <Tooltip
        title={tablets.map(i => (
          <ResizeItem currentName={name} item={i} key={i[0]} />
        ))}
        placement="bottomRight"
        overlayClassName="editor-resize-items"
        arrowPointAtCenter
      >
        <div
          key="tablet"
          className={tabletNames.includes(name) ? 'selected' : ''}
          onClick={() => editStore.setDevice(tablets[0])}
        >
          <MdTabletMac style={{ width: '18px', height: '18px', position: 'relative', top: '-2px' }} />
        </div>
      </Tooltip>

      <Tooltip
        title={desktops.map(i => (
          <ResizeItem currentName={name} item={i} key={i[0]} />
        ))}
        placement="bottomRight"
        overlayClassName="editor-resize-items"
        arrowPointAtCenter
      >
        <div
          key="desktop"
          className={desktopNames.includes(name) ? 'selected' : ''}
          onClick={() => editStore.setDevice(desktops[0])}
        >
          <MdLaptop />
        </div>
      </Tooltip>
    </div>
  );
}

interface ItemProps {
  item: DeviceItem;
  currentName: string;
}

function ResizeItem({ item, currentName }: ItemProps) {
  const [name, width, height] = item;
  return (
    <div
      key={name}
      className={classnames('editor-resize-item', {
        selected: currentName === name,
      })}
      onClick={() => editStore.setDevice(item)}
    >
      {item[0]}（{width} x {height}）
    </div>
  );
}

export const EditorResize = observer(IEditorResize);
