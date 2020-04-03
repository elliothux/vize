import * as React from "react";
import { SandboxRender } from "../SandboxRender";
import { observer } from "mobx-react";
import { materialsStore } from "../../states";

@observer
export class Renderer extends React.Component {
  private iframeDidMount = (doc: Document, win: Window) => {
    console.log(doc, win);
  };

  public render() {
    const { containerHTML } = materialsStore;

    return (
      <SandboxRender
        mountTarget="#vize-main-entry"
        htmlContent={containerHTML}
        iframeDidMount={this.iframeDidMount}
      >
        {() => {
          return <h1>hello</h1>;
        }}
      </SandboxRender>
    );
  }
}
