import * as React from "react";
import { SandboxRender } from "../SandboxRender";
import { observer } from "mobx-react";
import { materialsStore } from "../../states";
import { injectStyle, loadUMDModuleFromString } from "../../utils/loader";
import { Maybe } from "../../types";

@observer
export class Renderer extends React.Component {
  public state = {
    ready: false
  };

  private renderEntry: Maybe<Function> = null;

  private callRender = (
    renderer: (content: React.ReactNode) => React.ReactNode,
    content: React.ReactNode
  ): React.ReactNode => {
    if (this.state.ready) {
      debugger;
      this.renderEntry!({ render: () => renderer(content) });
    }
    return null;
  };

  private iframeDidMount = async (doc: Document, win: Window) => {
    const {
      mainScript,
      mainStyle,
      mainEntryName,
      entryScript,
      entryStyle,
      entryEntryName
    } = materialsStore;

    const [main, entry] = await Promise.all([
      loadUMDModuleFromString(mainScript, mainEntryName, win),
      loadUMDModuleFromString<Function>(entryScript, entryEntryName, win),
      mainStyle ? injectStyle(mainStyle, win) : Promise.resolve(),
      entryStyle ? injectStyle(entryStyle, win) : Promise.resolve()
    ]);

    this.renderEntry = entry as Function;
    this.setState({ ready: true });
  };

  public render() {
    const { containerHTML } = materialsStore;

    return (
      <SandboxRender
        mountTarget="#vize-main-entry"
        htmlContent={containerHTML}
        iframeDidMount={this.iframeDidMount}
      >
        {renderer => this.callRender(renderer, <h1>hello</h1>)}
      </SandboxRender>
    );
  }
}
