import { CommonStyle, FixedOutset, IPositionStyle, MergedCommonStyles, PositionStyle } from '@vize/types/src';

export function calcPosition(position: PositionStyle): IPositionStyle {
  if (typeof position === 'boolean') {
    return {};
  }

  const style = {
    position: 'fixed',
    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined,
  } as IPositionStyle;

  const { top, left, right, bottom, outset } = position;
  if (outset === FixedOutset.TopLeft) {
    style.top = top;
    style.left = left;
  } else if (outset === FixedOutset.TopRight) {
    style.top = top;
    style.right = right;
  } else if (outset === FixedOutset.BottomLeft) {
    style.bottom = bottom;
    style.left = left;
  } else if (outset === FixedOutset.BottomRight) {
    style.bottom = bottom;
    style.right = right;
  }

  return style;
}

export function mergeCommonStyle(commonStyle: CommonStyle): MergedCommonStyles {
  const { size, transform, text, border, background, margin, padding, zIndex, position } = commonStyle;

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

  if (position) {
    Object.assign(style, calcPosition(position));
  }

  return style;
}

function px(px: number): string {
  return `${px}px`;
}

function pxWithAuto(px: number | 'auto'): string {
  return px === 'auto' ? 'auto' : `${px}px`;
}

function isEmpty(i: any): boolean {
  if (typeof i === 'string') return !i.trim();
  return i === null || isNaN(i) || i === undefined;
}
