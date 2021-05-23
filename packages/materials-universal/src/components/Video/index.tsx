import './index.scss';
import 'video-react/styles/scss/video-react';
import * as React from 'react';
import { Player } from 'video-react/dist/video-react.min';
import { ComponentProps } from '@vize/types';
import { isUrl } from '../../lib/utils';
import { EmptyData } from '../../lib/components/EmptyData';

interface Data {
  url: string;
  poster: string;
}

export default function Video({ data: { url, poster }, commonStyle }: ComponentProps<Data>) {
  if (!isUrl(url)) {
    return <EmptyData text="未配置视频链接" />;
  }

  return (
    <div className="vize-materials-universal-text" style={commonStyle}>
      <Player poster={poster}>
        <source src={url} />
      </Player>
    </div>
  );
}
