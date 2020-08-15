/* eslint-disable max-lines */
import * as R from 'ramda';
import { CommonStyle, CommonStyleMeta, DistanceStyle, FixedOutset, PositionStyle } from 'types';
import { Maybe, PageStyle } from 'types';
import { px, pxWithAuto } from './common';
import { isEmpty, isNumber } from './is';

export interface MergedCommonStyles {
  width?: string;
  height?: string;
  maxWidth?: string;
  transform?: string;
  opacity?: number;
  borderRadius?: string;
  color?: string;
  fontSize?: number;
  lineHeight?: string;
  textAlign?: string;
  fontWeight?: string;
  margin?: string;
  padding?: string;
  border?: string;
  background?: string;
  zIndex?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
}

export interface MergedStyle extends MergedCommonStyles {
  [key: string]: any;
}

export function mergeCommonStyle(commonStyle: CommonStyle): MergedCommonStyles {
  const { size, transform, text, border, background, margin, padding, zIndex } = commonStyle;

  const style: MergedCommonStyles = {};

  if (size) {
    if (!size.autoWidth) {
      style.width = `${size.width}px`;
    } else {
      style.maxWidth = '100%';
    }
    if (!size.autoHeight) style.height = `${size.height}px`;
  }

  if (transform) {
    const { rotate, opacity, scale, radius } = transform;
    if ((rotate && rotate !== 0) || (scale && scale !== 1)) {
      style.transform = `${rotate ? `rotate(${rotate}deg) ` : ''}${scale ? `scale(${scale})` : ''}`;
    }
    if (opacity && opacity < 1) {
      style.opacity = opacity;
    }
    if (radius && radius > 0) {
      style.borderRadius = `${radius}px`;
    }
  }

  if (margin) {
    const { top, right, bottom, left } = margin;
    if (top !== 0 || right !== 0 || bottom !== 0 || left !== 0) {
      style.margin = [top, right, bottom, left].map(pxWithAuto).join(' ');
    }
  }

  if (padding) {
    const { top, right, bottom, left } = padding;
    if (top !== 0 || right !== 0 || bottom !== 0 || left !== 0) {
      style.padding = [top, right, bottom, left].map(px).join(' ');
    }
  }

  if (typeof zIndex === 'number') {
    style.zIndex = zIndex;
  }

  if (text) {
    style.color = text.color;
    style.fontSize = text.fontSize;
    style.lineHeight = `${text.lineHeight}px`;
    style.textAlign = text.textAlign;
    style.fontWeight = text.weight;
  }

  if (border) {
    const { type, color, width } = border;
    if (width > 0) {
      style.border = `${width}px ${type} ${color}`;
    }
  }

  if (background) {
    const { color, image, size, repeat, position } = background;
    style.backgroundColor = color;
    if (!isEmpty(image)) {
      style.backgroundImage = `url(${image})`;
    }
    style.backgroundRepeat = repeat;
    style.backgroundSize = size;
    style.backgroundPosition = position;
  }

  return style;
}

export const defaultDistance = { top: 0, left: 0, bottom: 0, right: 0 };

export const defaultCommonStyle: CommonStyle = {
  size: {
    autoWidth: true,
    width: 200,
    autoHeight: true,
    height: 80,
  },
  transform: {
    rotate: 0,
    opacity: 1,
    scale: 1,
    radius: 0,
  },
  text: {
    color: '#161616',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    weight: 'normal',
  },
  border: {
    type: 'none',
    color: '#161616',
    width: 1,
  },
  background: {
    color: 'transparent',
    image: '',
    size: 'auto',
    position: 'center top',
    repeat: 'repeat-y',
  },
  margin: { ...defaultDistance, left: 'auto', right: 'auto' },
  padding: defaultDistance,
  zIndex: true,
  position: true,
};

export function getDefaultCommonStyle(styleGroup: Maybe<CommonStyleMeta | '*'>): CommonStyle {
  if (!styleGroup) {
    return {};
  }

  if (styleGroup === '*') {
    return defaultCommonStyle;
  }

  const style: CommonStyle = {};
  R.mapObjIndexed((value, key) => {
    if (key === 'zIndex') {
      if (typeof value === 'number') {
        style.zIndex = value;
      } else if (typeof value === 'boolean' && value) {
        style.zIndex = true;
      }
      return;
    }

    if (key === 'position') {
      if (typeof value === 'object') {
        style.position = getPositionFromMeta(value as DistanceStyle);
      } else if (typeof value === 'boolean' && value) {
        style.position = true;
      }
      return;
    }

    if ((key === 'margin' || key === 'padding') && typeof value === 'object') {
      (style as any)[key] = { ...defaultDistance, ...value };
      return;
    }

    if (typeof value === 'boolean' && value) {
      (style as any)[key] = (defaultCommonStyle as any)[key];
      return;
    }

    if (typeof value === 'object') {
      (style as any)[key] = { ...(defaultCommonStyle as any)[key], ...value };
    }
  }, styleGroup);

  return style;
}

export const defaultPageStyle: PageStyle = {
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  border: {
    type: 'none',
    color: '#161616',
    width: 1,
  },
  background: {
    color: '#ffffff',
    image: '',
    size: 'auto',
    position: 'center top',
    repeat: 'repeat-y',
  },
};

export function getPositionFromMeta(style: DistanceStyle): PositionStyle {
  const { top, right } = style;
  let outset = FixedOutset.BottomLeft;

  if (isNumber(top)) {
    outset = isNumber(right) ? FixedOutset.TopRight : FixedOutset.TopLeft;
  } else {
    outset = isNumber(right) ? FixedOutset.BottomRight : FixedOutset.BottomLeft;
  }

  return { ...defaultDistance, ...style, outset };
}
