import tinyColor, { ColorInputWithoutInstance } from 'tinycolor2';

export interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

// TODO: Update docs
export enum ColorFormat {
  HSV = 'hsv',
  HSL = 'hsl',
  HEX = 'hex',
  HEX8 = 'hex8',
  RGB = 'rgb',
  RGBA = 'rgba',
}

export function isAlphaSupported(format: ColorFormat) {
  return [ColorFormat.HEX8, ColorFormat.RGBA].includes(format);
}

export function parseColor(color: string): RGBAColor {
  return tinyColor(color).toRgb();
}

export function stringifyColor(color: ColorInputWithoutInstance, format: ColorFormat): string {
  const c = tinyColor.fromRatio(color);
  switch (format) {
    case ColorFormat.HSV:
      return c.toHsvString();
    case ColorFormat.HSL:
      return c.toHslString();
    case ColorFormat.HEX:
      return c.toHexString();
    case ColorFormat.HEX8:
      return c.toHex8String();
    case ColorFormat.RGB: {
      const { r, g, b } = c.toRgb();
      return `rgb(${r},${g},${b})`;
    }
    case ColorFormat.RGBA: {
      const { r, g, b, a } = c.toRgb();
      return `rgba(${r},${g},${b},${a})`;
    }
  }
}
