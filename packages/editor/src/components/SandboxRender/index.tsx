import * as React from "react";
import { Maybe } from "types";
import "./index.scss";

export class SandboxRender extends React.Component {
  private nodeRef: Maybe<HTMLIFrameElement> = null;

  private setNodeRef = (i: HTMLIFrameElement) => (this.nodeRef = i);

  public render() {
    return <iframe className="sandbox_render" ref={this.setNodeRef} />;
  }
}
