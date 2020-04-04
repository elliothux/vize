import { action, observable } from "mobx";
import {
  MaterialsActionMeta,
  MaterialsComponentMeta,
  MaterialsPluginMeta,
  Maybe,
  RequestStatus
} from "types";
import { loadMaterials } from "../utils/loader";
import { globalStore } from "./global";

export class MaterialsStore {
  @action
  public readonly init = async () => {
    return this.loadMaterials();
  };

  // @observable
  // materialsStatus: RequestStatus = RequestStatus.LOADING;

  @observable
  public components: { [id: number]: MaterialsComponentMeta } = {};

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
  public containerHTML: string = "";

  @action
  private readonly setContainerHTML = (html: string) => {
    this.containerHTML = html;
  };

  @observable
  public mainScript: string = "";

  @observable
  public mainStyle: Maybe<string> = null;

  @observable
  public mainEntryName: string = "";

  @action
  private readonly setMain = (
    script: string,
    style: Maybe<string>,
    entryName: string
  ) => {
    this.mainScript = script;
    this.mainEntryName = entryName;
    if (style) {
      this.mainStyle = style;
    }
  };

  @observable
  public entryScript: string = "";

  @observable
  public entryStyle: Maybe<string> = null;

  @observable
  public entryEntryName: string = "";

  @action
  private readonly setEntry = (
    script: string,
    style: Maybe<string>,
    entryName: string
  ) => {
    this.entryScript = script;
    this.entryEntryName = entryName;
    if (style) {
      this.entryStyle = style;
    }
  };

  @action
  private readonly loadMaterials = async () => {
    const { libName, debugPort } = globalStore;
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

    this.setContainerHTML(containerHTML);
    this.setComponents(components);
    this.setPlugins(plugins);
    this.setActions(actions);
    this.setMain(mainScript, mainStyle, mainEntryName);
    this.setEntry(entryScript, entryStyle, entryEntryName);
  };
}

export const materialsStore = new MaterialsStore();
