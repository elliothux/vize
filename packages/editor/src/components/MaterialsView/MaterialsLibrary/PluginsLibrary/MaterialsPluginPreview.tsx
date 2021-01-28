import * as React from 'react';
import { MaterialsPluginMeta } from 'types';
import { SVGRender } from 'widgets/SVGRender';
import { getMaterialsLibInfo } from 'runtime';
import { useMemo } from 'react';

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
            {name} ({pluginName})
          </p>
          <p className="desc">{desc}</p>
          <p className="lib">
            来自物料库
            <span> {displayName}</span>
          </p>
          <p className="author">
            由<span> {author} </span>
            开发
          </p>
        </div>
      </div>
    </div>
  );
}
