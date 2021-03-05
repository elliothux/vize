import * as React from 'react';
import { MaterialsComponentMeta } from 'types';
import { SVGRender } from 'widgets/SVGRender';
import { getMaterialsLibInfo } from 'runtime';
import { useMemo } from 'react';
import { Trans } from 'react-i18next';

interface Props {
  item: MaterialsComponentMeta;
}

export function MaterialsComponentPreview({ item }: Props) {
  const {
    name: componentName,
    lib,
    info: { name, desc, author },
    thumb,
    preview,
  } = item;

  const { displayName } = useMemo(() => getMaterialsLibInfo(lib)!, [lib]);

  return (
    <div className="vize-materials-component-preview">
      {preview ? <img src={preview} alt={name} /> : null}
      <div className="detail">
        {thumb ? <SVGRender content={thumb} /> : null}
        <div>
          <p className="name">
            {name} ({componentName})
          </p>
          <p className="desc">{desc}</p>
          <p className="lib">
            <Trans>From materials library</Trans>
            <span> {displayName}</span>
          </p>
          <p className="author">
            <Trans i18nKey="DevelopedBy">
              Development by <span> {{ author }} </span>
            </Trans>
          </p>
        </div>
      </div>
    </div>
  );
}
