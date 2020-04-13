import * as React from "react";
import { MaterialsPluginMeta } from "types";
import { SVGRender } from "components/SVGRender";

interface Props {
  item: MaterialsPluginMeta;
}

export function MaterialsPluginPreview({ item }: Props) {
  const {
    name: pluginName,
    lib,
    info: { name, desc, author },
    thumb,
    preview
  } = item;

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
