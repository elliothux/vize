declare module 'json-schema-defaults' {
  export function getDefaults(schema: string | object): object;
  export = getDefaults;
}

declare module 'braft-utils' {
  export namespace ContentUtils {
    export const insertMedias: Function;
  }
}

declare module 'braft-extensions/dist/color-picker' {
  declare const ColorPicker: Function;
  export = ColorPicker;
}

declare global {
  interface Window {
    React: any;
    ReactDom: any;
    ReactDomServer: any;
    Antd: any;
    FormilyCore: any;
    FormilyReact: any;
    FormilyAntd: any;
  }
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export = src;
}
