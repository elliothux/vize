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
