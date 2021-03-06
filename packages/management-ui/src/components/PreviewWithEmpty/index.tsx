import './index.scss';
import * as React from 'react';
import { BiHide } from 'react-icons/bi';
import { Maybe } from 'types';
import { Trans } from 'react-i18next';

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
          <p>
            <Trans>No Preview</Trans>
          </p>
        </>
      )}
    </div>
  );
}
