import * as React from 'react';
import { MaterialsComponentMeta } from 'types';
import { SVGRender } from 'widgets/SVGRender';
import { getMaterialsLibInfo } from 'runtime';
import { useMemo } from 'react';

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
