import * as React from 'react';
import { RenderSandbox } from '../RenderSandbox';
import { observer } from 'mobx-react';
import { contextMenu } from 'react-contexify';
import { globalStore, materialsStore } from 'states';
import { injectStyle, loadUMDModuleFromString } from 'utils/loader';
import { MaterialsMain, Maybe, ContainerRenderEntry } from 'types';
import { initDocument, setMaterialsMap } from 'utils';
import { LayoutRender } from '../LayoutRender';
import { injectRuntime, setUserAgent } from './utils';
import { InjectedStylesRender } from '../InjectedStylesRender';

import iframeStyle from './index.iframe.scss';

globalStore.setIframeStyle('Renderer', iframeStyle);

@observer
export class Renderer extends React.Component {
    public state = {
        ready: false,
    };

    private iframeDidMount = async (doc: Document, win: Window) => {
        injectRuntime(win);
        setUserAgent(win);
        this.initIframeDocument(doc, win);

        const renderEntry = await this.initMaterials(doc, win);
        if (!renderEntry) {
            throw new Error('No renderEntry');
        }
        this.callContainerRenderEntry(renderEntry);
    };

    private initIframeDocument = (doc: Document, win: Window) => {
        win.addEventListener('click', contextMenu.hideAll);
        initDocument(doc);
    };

    private initMaterials = async (doc: Document, win: Window): Promise<Maybe<ContainerRenderEntry>> => {
        let renderEntry: Maybe<ContainerRenderEntry> = null;

        await Promise.all(
            globalStore.libNames.map(async libName => {
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
        renderEntry({ render: () => this.setState({ ready: true }) });
    };

    private renderContent = () => {
        if (!this.state.ready) {
            return null;
        }

        return (
            <>
                <InjectedStylesRender />
                <LayoutRender />
            </>
        );
    };

    public render() {
        const { containerHTML } = materialsStore;

        return (
            <RenderSandbox
                mountTarget="#vize-main-entry"
                htmlContent={containerHTML}
                iframeDidMount={this.iframeDidMount}
            >
                {this.renderContent}
            </RenderSandbox>
        );
    }
}
