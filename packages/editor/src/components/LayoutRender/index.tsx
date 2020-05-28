import * as React from "react";
import { observer } from "mobx-react";
import { globalStore } from "../../states";
import { LayoutMode } from "../../types";
import { StreamLayoutRender } from "./StreamLayoutRender";

function ILayoutRender() {
  const { layoutMode } = globalStore;

  if (layoutMode === LayoutMode.STREAM) {
    return <StreamLayoutRender />;
  }

  // TODO
  return <StreamLayoutRender />;
}

export const LayoutRender = observer(ILayoutRender);
