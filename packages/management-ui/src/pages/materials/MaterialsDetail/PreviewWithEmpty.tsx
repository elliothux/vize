import * as React from 'react';
import { BiHide } from 'react-icons/bi';
import { Maybe } from 'types';

interface Props {
  src: Maybe<string>;
}

export function PreviewWithEmpty({ src }: Props) {
  return (
    <div className="preview-with-empty">
      {src ? (
        <img alt="preview" src={src} />
      ) : (
        <>
          <BiHide />
          <p>暂无预览图</p>
        </>
      )}
    </div>
  );
}
