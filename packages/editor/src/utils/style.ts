import * as R from 'ramda';
import { CommonStyle, CommonStyleMeta, DistanceStyle, FixedOutset, PositionStyle, Maybe } from '@vize/types';
import { isNumber } from './is';

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
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
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

export function getSliderValue(value: number | [number, number]): number {
  if (typeof value === 'number') {
    return value;
  }
  return 0;
}

const hyphenateRE = /\B([A-Z])/g;
export function humpToMiddleLine(str: string) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
}
