import * as React from "react";
import { ComponentsTree } from "./ComponentsTree";
import { PluginsTree } from "./PluginsTree";

import "./index.scss";

export function MaterialsTree() {
  return (
    <div className="vize-materials-tree">
      <ComponentsTree />
      <PluginsTree />
    </div>
  );
}
