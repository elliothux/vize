import './index.scss';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  onSelected: Function;
}

function createEntryNode(): HTMLDivElement {
  const node = document.createElement('div');
  document.body.appendChild(node);
  return node;
}

function Container({ children, onSelected }: React.PropsWithChildren<Props>) {
  const [visible, setVisible] = useState(false);
  const entry = useMemo<HTMLDivElement>(createEntryNode, []);
  const onClose = useCallback(() => setVisible(false), []);

  useEffect(() => {
    onSelected(({ selected }) => {
      setVisible(selected);
    });
    return () => {
      document.body.removeChild(entry);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return createPortal(
    <div className="vize-dialog">
      <div className="content">{children}</div>
      <button className="close" onClick={onClose}>
        关闭
      </button>
    </div>,
    entry,
  );
}

export default Container;
