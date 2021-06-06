import * as React from 'react';
import { Popover } from 'antd';
import { BiInfoCircle } from 'react-icons/bi';
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
        title={JSON.stringify(item, null, 4)
          .split('\n')
          .map((i, index) => (
            <p key={index}>{i}</p>
          ))}
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
