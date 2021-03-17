import { observable, action } from 'mobx';
import { MaterialsRecord, Maybe } from 'types';
import { queryLibs } from 'api';
import { message } from 'antd';
import { i18n } from 'i18n';

export class MaterialsStore {
  public init = () => {
    return this.getMaterialsList();
  };

  @observable
  public materialsList: Maybe<MaterialsRecord[]> = null;

  @action
  public setMaterialsList = (list: MaterialsRecord[]) => {
    this.materialsList = list;
  };

  public getMaterialsList = async () => {
    const [success, data, response] = await queryLibs();
    if (!success) {
      message.error(`${i18n.t('Failed to get materials list')}：${response.message}`);
    }

    this.setMaterialsList(data!);
  };

  public getMaterialsByLibNames = (libNames: string[] | undefined) => {
    if (!libNames) {
      return null;
    }
    return this.materialsList?.filter(i => libNames.includes(i.libName));
  };
}

export const materialsStore = new MaterialsStore();

materialsStore.init();
