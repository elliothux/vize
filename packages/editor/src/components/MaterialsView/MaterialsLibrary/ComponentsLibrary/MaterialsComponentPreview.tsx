import * as React from 'react';
import { MaterialsComponentMeta } from 'types';
import { SVGRender } from 'components/SVGRender';

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
            组件来自素材库
            <span> {lib}</span>
          </p>
          <p className="author">
            组件由
            <span> {author} </span>
            开发
          </p>
        </div>
      </div>
    </div>
  );
}
