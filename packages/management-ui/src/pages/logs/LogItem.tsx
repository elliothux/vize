import * as React from 'react';
import { message, Popover } from 'antd';
import { BiInfoCircle } from 'react-icons/bi';
import JsonView from 'react-json-view';
import { LogItem as Item } from './types';

interface Props {
  logs: Item[];
}

export function LogContentItem({ logs }: Props) {
  return (
    <>
      {logs.map((i, index) => (
        <LogItem key={index} item={i} />
      ))}
    </>
  );
}

interface ItemProps {
  item: Item;
}

function LogItem({ item }: ItemProps) {
  return (
    <div className="log-content-item">
      <Popover
        title="Log Detail"
        placement="topLeft"
        content={
          <JsonView src={item} name="log" displayDataTypes={false} enableClipboard={() => message.success('copied')} />
        }
      >
        <BiInfoCircle />
      </Popover>

      <div className="log-item-meta">
        <span className="timestamp">{item.timestamp}</span>
        <span className={`level ${item.level}`}>{item.level}</span>
      </div>

      <div>
        <span className="context">[{item.context}]</span>
        <span className="message">{item.message}</span>
      </div>
    </div>
  );
}
