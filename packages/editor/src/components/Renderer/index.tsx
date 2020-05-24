import * as React from "react";
import { SandboxRender } from "../SandboxRender";
import { observer } from "mobx-react";
import { contextMenu } from "react-contexify";
import { globalStore, materialsStore } from "../../states";
import { injectStyle, loadUMDModuleFromString } from "../../utils/loader";
import {
  MaterialsMain,
  Maybe,
  ContainerRenderEntry,
  RenderEntryParams
} from "../../types";
import { initDocument, setMaterialsMap } from "../../utils";

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
    let renderEntry: Maybe<ContainerRenderEntry> = null;

    await Promise.all(
      globalStore.libNames.map(async libName => {
        const [main, entry] = await this.initMaterialsWithIframeContext(
          libName,
          doc,
          win
        );

        setMaterialsMap(libName, main);

        if (entry) {
          renderEntry = entry;
        }
      })
    );

    this.callContainerRenderEntry(renderEntry!);
  };

  private initMaterialsWithIframeContext = async (
    libName: string,
    doc: Document,
    win: Window
  ): Promise<[MaterialsMain, Maybe<ContainerRenderEntry>, void, void]> => {
    const {
      isMainLib,
      mainScript,
      mainStyle,
      mainEntryName,
      entryScript,
      entryStyle,
      entryEntryName
    } = materialsStore.materialsLibs[libName]!;

    return Promise.all([
      loadUMDModuleFromString<MaterialsMain>(mainScript, mainEntryName, win),
      isMainLib
        ? loadUMDModuleFromString<ContainerRenderEntry>(
            entryScript!,
            entryEntryName!,
            win
          )
        : Promise.resolve(null),
      mainStyle ? injectStyle(mainStyle, win) : Promise.resolve(),
      isMainLib && entryStyle ? injectStyle(entryStyle, win) : Promise.resolve()
    ]);
  };

  private callContainerRenderEntry = (renderEntry: ContainerRenderEntry) => {
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
