import * as React from 'react';
import { editStore } from 'states';
import { GlobalStyle } from './GlobalStyle';

export function InjectedStylesRender() {
  const { iframeStyleMap } = editStore;
  return (
    <>
      <GlobalStyle />
      {Object.entries(iframeStyleMap).map(([name, style]) => (
        <style type="text/css" key={name} className={`vize-injected-styles ${name}`}>
          {style}
        </style>
      ))}
    </>
  );
}

// export const InjectedStylesRender = observer(IInjectedStylesRender);
