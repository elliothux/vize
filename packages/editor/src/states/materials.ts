import { action, observable, computed, toJS, runInAction } from "mobx";
import {
  MaterialsActionMeta,
  MaterialsComponentMeta,
  MaterialsPluginMeta,
  Maybe
} from "types";
import { loadMaterials, injectGlobalReadonlyGetter } from "../utils";
import { globalStore } from "./global";

interface MaterialsLibItem {
  readonly isMainLib: boolean;
  readonly libName: string;
  readonly containerHTML: Maybe<string>;
  readonly mainScript: string;
  readonly mainStyle: Maybe<string>;
  readonly mainEntryName: string;
  readonly entryScript: Maybe<string>;
  readonly entryStyle: Maybe<string>;
  readonly entryEntryName: Maybe<string>;
}

export class MaterialsStore {
  @action
  public readonly init = () => {
    const { libNames, debugPorts } = globalStore;
    return Promise.all(
      libNames.map((name, index) => {
        return this.loadMaterials(name, debugPorts[index]);
      })
    );
  };

  @observable
  public components: { [id: string]: MaterialsComponentMeta } = {};

  public getComponentMeta = (id: string) => this.components[id];

  @observable
  public plugins: { [id: string]: MaterialsPluginMeta } = {};

  public getPluginMeta = (id: string) => this.plugins[id];

  @observable
  public actions: { [id: string]: MaterialsActionMeta } = {};

  public getActionMeta = (id: string) => this.actions[id];

  @observable
  public materialsLibs: { [libName: string]: MaterialsLibItem } = {};

  @computed
  public get containerHTML(): string {
    const { containerHTML = "" } = this.materialsLibs[globalStore.mainLib]!;
    return containerHTML!;
  }

  @action
  private readonly loadMaterials = async (
    libName: string,
    debugPort?: number
  ): Promise<void> => {
    const {
      containerHTML,
      meta: { components, actions, plugins },
      main: { script: mainScript, style: mainStyle, entryName: mainEntryName },
      entry: {
        script: entryScript,
        style: entryStyle,
        entryName: entryEntryName
      }
    } = await loadMaterials(libName, debugPort || undefined);

    runInAction(() => {
      this.components = components;
      this.plugins = plugins;
      this.actions = actions;

      const isMainLib = globalStore.mainLib === libName;

      this.materialsLibs[libName] = {
        isMainLib,
        libName,
        containerHTML: isMainLib ? containerHTML : null,
        mainScript,
        mainStyle,
        mainEntryName,
        entryScript: isMainLib ? entryScript : null,
        entryStyle: isMainLib ? entryStyle : null,
        entryEntryName: isMainLib ? entryEntryName : null
      };
    });
  };
}

export const materialsStore = new MaterialsStore();

injectGlobalReadonlyGetter("vize_materials_store", () => toJS(materialsStore));
