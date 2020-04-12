import * as React from "react";
import { SandboxRender } from "../SandboxRender";
import { observer } from "mobx-react";
import { contextMenu } from "react-contexify";
import { materialsStore } from "../../states";
import { injectStyle, loadUMDModuleFromString } from "../../utils/loader";
import { Maybe, RenderEntry, RenderEntryParams } from "../../types";
import { initDocument } from "../../utils";

@observer
export class Renderer extends React.Component {
  public state = {
    ready: false
  };

  private initIframeDocument = (
    doc: Document,
    win: Window,
    callback: Function
  ) => {
    win.addEventListener("click", contextMenu.hideAll);
    initDocument(doc, callback);
  };

  private iframeDidMount = async (doc: Document, win: Window) => {
    this.initIframeDocument(doc, win, async () => {
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
        loadUMDModuleFromString<RenderEntry>(entryScript, entryEntryName, win),
        mainStyle ? injectStyle(mainStyle, win) : Promise.resolve(),
        entryStyle ? injectStyle(entryStyle, win) : Promise.resolve()
      ]);

      if (entry) {
        this.callRenderEntry(entry as RenderEntry);
      }
    });
  };

  private callRenderEntry = (renderEntry: RenderEntry) => {
    renderEntry({ render: () => this.setState({ ready: true }) });
  };

  private renderContent = () => {
    if (!this.state.ready) {
      return null;
    }

    return <h1>hello</h1>;
  };

  public render() {
    const { containerHTML } = materialsStore;

    return (
      <SandboxRender
        mountTarget="#vize-main-entry"
        htmlContent={containerHTML}
        iframeDidMount={this.iframeDidMount}
      >
        {this.renderContent}
      </SandboxRender>
    );
  }
}
