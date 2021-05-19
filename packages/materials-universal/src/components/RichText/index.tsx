import './index.scss';
import * as React from 'react';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { ComponentProps } from '@vize/types';
import { WithFrame } from '../../lib/components/WithFrame';
import { style } from './style';

export default function RichText({
  data: {
    content: { html },
  },
  commonStyle,
}: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [frameStyle, setFrameStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    setFrameStyle({ height: ref.current.scrollHeight + 16 });
  }, [ref.current, html]);

  return (
    <WithFrame className="vize-materials-universal-richtext-wrap" style={frameStyle}>
      <style type="text/css">{style}</style>
      <div
        ref={ref}
        className="vize-materials-universal-richtext"
        style={commonStyle}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </WithFrame>
  );
}
