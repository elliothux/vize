import './index.scss';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  onSelected: Function;
}

// function createEntryNode(): HTMLDivElement {
//   const node = document.createElement('div');
//   document.body.appendChild(node);
//   return node;
// }

function Container({ children, onSelected }: React.PropsWithChildren<Props>) {
  const [visible, setVisible] = useState(false);
  // const entry = useMemo<HTMLDivElement>(createEntryNode, []);
  const onClose = useCallback(() => setVisible(false), []);

  useEffect(() => {
    onSelected(({ selected }: any) => {
      setVisible(selected);
    });
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="vize-dialog" onClick={onClose}>
      <div className="content">{children}</div>
      <button className="close" onClick={onClose}>
        关闭
      </button>
    </div>
  );
}

export default Container;
