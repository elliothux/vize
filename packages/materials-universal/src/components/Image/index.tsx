import './index.scss';
import * as React from 'react';

interface Props {
  data: {
    src: string;
  };
  hotAreas?: React.ReactElement;
}

export default function Image({ data: { src }, hotAreas }: Props) {
  return (
    <div className="vize-materials-universal image">
      {hotAreas}
      <img className="vize-material-image" src={src} alt="[图片]" />
    </div>
  );
}
