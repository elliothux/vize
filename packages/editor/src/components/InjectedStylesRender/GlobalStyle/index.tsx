import * as React from 'react';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { globalStore } from 'states';
import { humpToMiddleLine } from 'utils';
import { mergeCommonStyle } from 'runtime';

function IGlobalStyle() {
  const { globalStyle } = globalStore;
  const iGlobalStyle = useMemo(
    () =>
      Object.entries(mergeCommonStyle(globalStyle)).reduce((styleString, [propName, propValue]) => {
        return `${styleString}${humpToMiddleLine(propName)}: ${propValue} !important;\n`;
      }, ''),
    [globalStyle],
  );
  return (
    <>
      <style type="text/css" className="injected-styles-global">
        {`body {\n${iGlobalStyle}}`}
      </style>
    </>
  );
}

export const GlobalStyle = observer(IGlobalStyle);
