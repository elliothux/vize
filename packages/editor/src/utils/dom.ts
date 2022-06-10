import { Maybe } from '@vize/types';

function getOffsetTopToViewport(e: HTMLElement): number {
  let location = 0;
  let elem: Maybe<HTMLElement> = e;
  if (elem.offsetParent) {
    do {
      location += elem.offsetTop;
      elem = elem.offsetParent as Maybe<HTMLElement>;
    } while (elem);
  }
  return location >= 0 ? location : 0;
}

function getOffsetLeftToViewport(e: HTMLElement): number {
  let location = 0;
  let elem: Maybe<HTMLElement> = e;
  if (elem.offsetParent) {
    do {
      location += elem.offsetLeft;
      elem = elem.offsetParent as Maybe<HTMLElement>;
    } while (elem);
  }
  return location >= 0 ? location : 0;
}

export function getOffsetToViewport(e: HTMLElement) {
  return {
    left: getOffsetLeftToViewport(e),
    top: getOffsetTopToViewport(e),
  };
}

export function getImageNaturalSize(src: string): Promise<[number, number]> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;

    image.addEventListener('load', ({ target }) => {
      const { naturalWidth, naturalHeight } = target as HTMLImageElement;
      if (naturalWidth === 0 || naturalHeight === 0) {
        reject('zero natual size');
      }
      return resolve([naturalWidth, naturalHeight]);
    });

    image.addEventListener('error', reject);
  });
}
