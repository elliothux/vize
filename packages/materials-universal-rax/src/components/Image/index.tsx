import './index.scss';
import { createElement } from 'rax';
import { ComponentProps } from '@vize/types';

const defaultSrc =
  'https://img.alicdn.com/imgextra/i2/O1CN01D67Qry1Etp2nhDeZ8_!!6000000000410-2-tps-302-167.png';

export default function Image({ hotAreas, data: { src }, commonStyle }: ComponentProps) {
  return (
    <div className="vize-materials-universal-image-wrapper" style={commonStyle}>
      {hotAreas}
      <img className="vize-materials-universal-image" src={src || defaultSrc} alt="[图片]" />
    </div>
  );
}
