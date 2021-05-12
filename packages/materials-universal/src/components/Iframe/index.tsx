import './index.scss';
import * as React from 'react';
import { ComponentProps } from '@vize/types';
import { isUrl } from '../../lib/utils';
import { EmptyData } from '../../lib/components/EmptyData';

interface Data {
  url: string;
  title: string;
}

export default function IFrame({ data: { url, title }, commonStyle }: ComponentProps<Data>) {
  if (!isUrl(url)) {
    return <EmptyData text="未输入有效URL" />;
  }

  return <iframe title={title} className="vize-materials-universal-iframe" style={commonStyle} src={url} />;
}
