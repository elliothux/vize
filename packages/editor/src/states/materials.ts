import { observable } from "mobx";
import { MaterialsComponent, Maybe } from "types";

export class MaterialsStore {
  @observable
  components: Maybe<{ [id: number]: MaterialsComponent }>;
}

export const materialsStore = new MaterialsStore();
