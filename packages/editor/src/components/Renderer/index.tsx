import './index.scss';
import * as React from 'react';
import { RenderSandbox } from 'widgets/RenderSandbox';
import { observer } from 'mobx-react';
import { contextMenu } from 'react-contexify';
import { componentsStore, editStore, globalStore, materialsStore, pagesStore, pluginsStore, sharedStore } from 'states';
import { injectStyle, loadUMDModuleFromString } from 'utils/loader';
import { MaterialsMain, Maybe, ContainerRenderEntry, ComponentInstance } from 'types';
import { initDocument, registerHotkey } from 'utils';
import { setMaterialsMap, executePlugins } from 'runtime';
import tpl from 'lodash.template';
import { LayoutRender } from '../LayoutRender';
import { injectRuntime, setUserAgent } from './utils';
import { InjectedStylesRender } from '../InjectedStylesRender';

import iframeStyle from './index.iframe.scss';

editStore.setIframeStyle('Renderer', iframeStyle);

@observer
export class Renderer extends React.Component {
  constructor(props: {}) {
    super(props);
    const { containerHTML } = materialsStore;
    const params = { global: {}, meta: {}, mainStyle: '', mainScript: '' };
    this.containerHTML = tpl(containerHTML)(params);
  }

  private readonly containerHTML: string;

  public state = {
    ready: false,
  };

  private iframeDidMount = async (doc: Document, win: Window) => {
    injectRuntime(win);
    registerHotkey(doc);
    setUserAgent(win);
    this.initIframeDocument(doc, win);

    const renderEntry = await this.initMaterials(doc, win);
    if (!renderEntry) {
      throw new Error('No renderEntry');
    }

    executePlugins(pluginsStore.pluginInstances, globalStore.metaInfo, globalStore.globalProps, pagesStore.router, win);
    this.callContainerRenderEntry(renderEntry);
  };

  private initIframeDocument = (doc: Document, win: Window) => {
    win.addEventListener('click', contextMenu.hideAll);
    initDocument(doc);
  };

  private initMaterials = async (doc: Document, win: Window): Promise<Maybe<ContainerRenderEntry>> => {
    let renderEntry: Maybe<ContainerRenderEntry> = null;

    await Promise.all(
      editStore.libNames.map(async libName => {
        const [main, entry] = await this.initMaterialsWithIframeContext(libName, doc, win);

        setMaterialsMap(libName, main);

        if (entry) {
          renderEntry = entry;
        }
      }),
    );

    return renderEntry;
  };

  private initMaterialsWithIframeContext = async (
    libName: string,
    doc: Document,
    win: Window,
  ): Promise<[MaterialsMain, Maybe<ContainerRenderEntry>, void, void]> => {
    const {
      isMainLib,
      mainScript,
      mainStyle,
      mainEntryName,
      entryScript,
      entryStyle,
      entryEntryName,
    } = materialsStore.materialsLibs[libName]!;

    return Promise.all([
      loadUMDModuleFromString<MaterialsMain>(mainScript, mainEntryName, win),
      isMainLib
        ? loadUMDModuleFromString<ContainerRenderEntry>(entryScript!, entryEntryName!, win)
        : Promise.resolve(null),
      mainStyle ? injectStyle(mainStyle, win) : Promise.resolve(),
      isMainLib && entryStyle ? injectStyle(entryStyle, win) : Promise.resolve(),
    ]);
  };

  private callContainerRenderEntry = (renderEntry: ContainerRenderEntry) => {
    const { globalProps: global, metaInfo: meta } = globalStore;
    // TODO
    renderEntry({
      implementRouterController: console.log,
      render: () => this.setState({ ready: true }),
      global,
      meta,
    });
  };

  private renderContent = (
    doc: Document,
    win: Window,
    mountTarget: HTMLDivElement,
    componentInstances: ComponentInstance[],
    sharedComponentInstances: ComponentInstance[],
  ) => {
    if (!this.state.ready) {
      return null;
    }

    return (
      <>
        <InjectedStylesRender />
        <LayoutRender
          mountTarget={mountTarget}
          // renderContext={win}
          componentInstances={componentInstances}
          sharedComponentInstances={sharedComponentInstances}
        />
      </>
    );
  };

  public render() {
    const { componentInstances } = componentsStore;
    const { sharedComponentInstances } = sharedStore;

    return (
      <RenderSandbox
        mountTarget="#vize-main-entry"
        htmlContent={this.containerHTML}
        iframeDidMount={this.iframeDidMount}
        componentInstances={componentInstances}
        sharedComponentInstances={sharedComponentInstances}
      >
        {this.renderContent}
      </RenderSandbox>
    );
  }
}

export * from './WithRerender';
