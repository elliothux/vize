import * as React from 'react';
import { PropsWithChildren, useEffect, useRef, useState, createElement, MutableRefObject } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  documentRef?: MutableRefObject<Document | null>;
  didMount?: (doc: Document) => void;
}

export function WithFrame({ children, documentRef, didMount }: PropsWithChildren<Props>) {
  const ref = useRef<HTMLIFrameElement>(null);
  const entryNode = useRef<HTMLDivElement>(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const doc = ref.current?.contentDocument;
    if (!doc) {
      return;
    }

    if (documentRef) {
      documentRef.current = doc;
    }

    const entry = document.createElement('div');
    doc!.body.appendChild(entry);
    (entryNode as any).current = entry;
    setRender(true);

    if (didMount) {
      didMount(doc);
    }
  }, [ref.current]);

  return (
    <>
      <iframe ref={ref} />
      {render ? createPortal(children, entryNode.current!) : null}
    </>
  );
}

export function withFrame<T>(component: React.ComponentType<T>) {
  return function WithFrameComponent(props: T) {
    return <WithFrame>{createElement(component, props)}</WithFrame>;
  };
}
