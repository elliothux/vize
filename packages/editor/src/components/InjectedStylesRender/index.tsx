import * as React from 'react';
import { useMemo } from 'react';
import { globalStore } from 'states';
import { mergeCommonStyle, humpToMiddleLine } from 'utils';

export function InjectedStylesRender() {
  const { iframeStyleMap, globalStyle } = globalStore;
  const iGlobalStyle = useMemo(
    () =>
      Object.entries(mergeCommonStyle(globalStyle)).reduce((styleString, [propName, propValue]) => {
        return `${styleString}${humpToMiddleLine(propName)}: ${propValue} !important;\n`;
      }, ''),
    [globalStyle],
  );
  console.log(iGlobalStyle);
  return (
    <>
      <style type="text/css" className="injected-styles-global">
        {`body {\n${iGlobalStyle}}`}
      </style>
      {Object.entries(iframeStyleMap).map(([name, style]) => (
        <style type="text/css" key={name} className={`vize-injected-styles ${name}`}>
          {style}
        </style>
      ))}
    </>
  );
}
