import * as React from 'react';
import { LogItem } from './utils';

interface Props {
  logs: LogItem[];
}

export function LogsContent({ logs }: Props) {
  return (
    <>
      {logs.map(i => (
        <LogContentItem key={i.message} item={i} />
      ))}
    </>
  );
}

interface ItemProps {
  item: LogItem;
}

function LogContentItem({ item }: ItemProps) {
  return (
    <div className="log-content-item">
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
