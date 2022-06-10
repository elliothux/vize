import * as React from 'react';
import { MaterialsPluginMeta } from '@vize/types';
import { SVGRender } from 'widgets/SVGRender';
import { getMaterialsLibInfo } from '@vize/runtime-web';
import { useMemo } from 'react';
import { Trans } from 'react-i18next';

interface Props {
  item: MaterialsPluginMeta;
}

export function MaterialsPluginPreview({ item }: Props) {
  const {
    name: pluginName,
    lib,
    info: { name, desc, author },
    thumb,
    preview,
  } = item;

  const { displayName } = useMemo(() => getMaterialsLibInfo(lib)!, [lib]);

  return (
    <div className="vize-materials-plugin-preview">
      {preview ? <img src={preview} alt={name} /> : null}
      <div className="detail">
        {thumb ? <SVGRender content={thumb} /> : null}
        <div>
          <p className="name">
            {name}
            <br />
            {pluginName}
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
