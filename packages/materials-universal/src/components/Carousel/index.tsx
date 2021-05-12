import './index.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import * as React from 'react';
import { useCallback } from 'react';
import { ComponentProps } from '@vize/types';
import { Carousel as CarouselComponent } from 'react-responsive-carousel';
import { EmptyData } from '../../lib/components/EmptyData';

interface Data {
  autoplay: boolean;
  vertical: boolean;
  interval: number;
  images: { image: string; link: string }[];
}

export default function Carousel({
  commonStyle,
  data: { images, autoplay, vertical, interval },
}: ComponentProps<Data>) {
  const onClickItem = useCallback(
    index => {
      if (images[index].link) {
        return window.open(images[index].link, '_blank');
      }
    },
    [images],
  );

  if (!images.length) {
    return <EmptyData text="未配置图片" />;
  }

  return (
    <div className="vize-materials-universal-carousel" style={commonStyle}>
      <CarouselComponent
        onClickItem={onClickItem}
        interval={interval * 1000}
        autoPlay={autoplay}
        axis={vertical ? 'vertical' : 'horizontal'}
        verticalSwipe="natural"
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        dynamicHeight
        stopOnHover
        infiniteLoop
        emulateTouch
      >
        {images.map(({ image }, index) => (
          <img
            key={`${index}-${image}`}
            className="vize-materials-universal-carousel-image"
            src={image}
            alt="[Image]"
            // mode="widthFix"
          />
        ))}
      </CarouselComponent>
    </div>
  );
}
