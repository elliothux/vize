import { action, observable, computed, toJS } from "mobx";
import {
  MaterialsActionMeta,
  MaterialsComponentMeta,
  MaterialsPluginMeta,
  Maybe
} from "types";
import { loadMaterials, injectGlobal } from "../utils";
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

  @action
  private readonly setComponents = (
    components: MaterialsStore["components"]
  ) => {
    this.components = components;
  };

  @observable
  public plugins: { [id: number]: MaterialsPluginMeta } = {};

  @action
  private readonly setPlugins = (plugins: MaterialsStore["plugins"]) => {
    this.plugins = plugins;
  };

  @observable
  public actions: { [id: number]: MaterialsActionMeta } = {};

  @action
  private readonly setActions = (actions: MaterialsStore["actions"]) => {
    this.actions = actions;
  };

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

    this.setComponents(components);
    this.setPlugins(plugins);
    this.setActions(actions);

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
  };
}

export const materialsStore = new MaterialsStore();

injectGlobal("vize_materials_store", () => toJS(materialsStore));
