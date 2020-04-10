import * as React from "react";
import { MaterialsTree } from "./MaterialsTree";
import { PagesList } from "./PagesList";
import "./index.scss";

export function MaterialsView() {
  return (
    <div className="vize-materials-view">
      <PagesList />
      <MaterialsTree />
    </div>
  );
}
