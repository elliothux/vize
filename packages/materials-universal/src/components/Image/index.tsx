import './index.scss';
import * as React from 'react';

interface Props {
  data: {
    src: string;
  };
  hotAreas?: React.ReactElement | null;
}

export default function Image({ data, hotAreas }: Props) {
  const { src } = data;

  return (
    <div className="vize-materials-universal image">
      {hotAreas}
      <img className="vize-material-image" src={src} alt="[图片]" />
    </div>
  );
}
