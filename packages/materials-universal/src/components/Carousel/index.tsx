import './index.scss';
import 'antd-mobile/es/carousel/style/index.css';
import * as React from 'react';
import { ComponentProps } from '@vize/types';
import { default as CarouselComponent } from 'antd-mobile/es/carousel';

interface Data {
  images: { image: string; link: string }[];
}

export default function Carousel({ data: { images } }: ComponentProps<Data>) {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <CarouselComponent className="vize-materials-universal-carousel" autoplay infinite>
      {images.map(({ image, link }, index) => {
        const content = (
          <img
            src={image}
            alt="image"
            key={index}
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={index === 0 ? forceUpdate : undefined}
          />
        );
        if (!link) {
          return content;
        }
        return (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', width: '100%' }}
          >
            {content}
          </a>
        );
      })}
    </CarouselComponent>
  );
}
