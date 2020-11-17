import './index.scss';
import * as React from 'react';

interface Props {
  data: {
    src: string;
  };
  hotAreas?: React.ReactElement | null;
  commonStyle: any;
}

export default function Image({ data, hotAreas, commonStyle }: Props) {
  const { src } = data;

  return (
    <div className="vize-materials-universal image" style={commonStyle}>
      {hotAreas}
      <img className="vize-material-image" src={src} alt="[图片]" />
    </div>
  );
}
