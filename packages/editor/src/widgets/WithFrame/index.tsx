import * as React from 'react';
import { PropsWithChildren, useEffect, useRef, useState, createElement } from 'react';
import { createPortal } from 'react-dom';

export function WithFrame({ children }: PropsWithChildren<{}>) {
  const ref = useRef<HTMLIFrameElement>(null);
  const entryNode = useRef<HTMLDivElement>(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (!ref.current?.contentDocument) {
      return;
    }
    const entry = document.createElement('div');
    ref.current!.contentDocument.body.appendChild(entry);
    (entryNode as any).current = entry;
    setRender(true);
  }, [ref.current]);

  return (
    <>
      <iframe ref={ref} />
      {render && createPortal(children, entryNode.current!)}
    </>
  );
}

export function withFrame<T>(component: React.ComponentType<T>) {
  return function WithFrameComponent(props: T) {
    return <WithFrame>{createElement(component, props)}</WithFrame>;
  };
}
