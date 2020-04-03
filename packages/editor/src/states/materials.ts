import { action, observable } from "mobx";
import {
  MaterialsActionMeta,
  MaterialsComponentMeta,
  MaterialsPluginMeta,
  RequestStatus
} from "types";

export class MaterialsStore {
  @observable
  materialsStatus: RequestStatus = RequestStatus.LOADING;

  @observable
  components: { [id: number]: MaterialsComponentMeta } = {};

  @observable
  plugins: { [id: number]: MaterialsPluginMeta } = {};

  @observable
  actions: { [id: number]: MaterialsActionMeta } = {};

  @action
  loadMaterials = () => {};
}

export const materialsStore = new MaterialsStore();
