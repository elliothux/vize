import { MaterialsComponentMeta } from "./component";
import { MaterialsPluginMeta } from "./plugins";
import { MaterialsActionMeta } from "./actions";
import * as React from "react";

export interface MaterialsInfo {
  name: string;
  desc: string;
  author: string;
  tags?: string[];
}

export interface MaterialsMeta {
  components: {
    [name: string]: MaterialsComponentMeta;
  };
  plugins: {
    [name: string]: MaterialsPluginMeta;
  };
  actions: {
    [name: string]: MaterialsActionMeta;
  };
}

export interface RenderEntryParams {
  render: Function;
}

export type RenderEntry = (params: RenderEntryParams) => void;
