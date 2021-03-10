import { action, computed, observable } from 'mobx';
import { getQueryParams } from 'utils';
import { LayoutMode, Maybe, PageMode } from 'types';
import { UserRecord } from 'sharedTypes';
import { StoreWithUtils } from './utils';
import { globalStore } from './global';
import { DeviceItem, phones } from 'components/Simulator/devices';

const defaultUser = { id: -1, name: 'vize-user', createdTime: new Date(), bizs: [], isAdmin: 0 };

export class EditStore extends StoreWithUtils<EditStore> {
  constructor() {
    super();
    const { id, key, libs, debugPorts, container } = getQueryParams();
    this.pageId = id;
    this.pageKey = key;
    this.libNames = libs;
    this.containerName = container;
    this.debugPorts = debugPorts;
    this.mainLib = libs[0];

    globalStore.setMetaInfo({
      id,
      key,
    });
  }

  public readonly pageId: Maybe<number>;

  public readonly pageKey: string;

  public readonly containerName: string;

  public readonly libNames: string[];

  public readonly mainLib: string;

  public readonly debugPorts: number[];

  public layoutMode: LayoutMode = LayoutMode.STREAM;

  public pageMode: PageMode = PageMode.SINGLE;

  public owner: UserRecord = defaultUser;

  public user: UserRecord = { ...defaultUser, id: 0 };

  @computed
  public get isSinglePageMode() {
    return this.pageMode === PageMode.SINGLE;
  }

  @observable
  public previewMode = false;

  @action
  public togglePreviewMode = () => {
    this.previewMode = !this.previewMode;
  };

  @observable
  public iframeStyleMap: { [name: string]: string } = {};

  @action
  public setIframeStyle = (name: string, style: string) => {
    this.iframeStyleMap[name] = style;
  };

  @observable
  public device: DeviceItem = phones[0];

  @action
  public setDevice = (device: DeviceItem) => {
    if (device[0] === this.device[0]) {
      return this.resetZoom();
    }

    const [, w, h] = device;
    const maxW = window.innerWidth - 260 - 300 - 64;
    const maxH = window.innerHeight - 50 - 64;

    let zoom;
    if (maxW < w) {
      zoom = Math.floor((maxW / w) * 10) * 10;
    }
    if (maxH < h) {
      zoom = Math.min(zoom || 999, Math.floor((maxH / h) * 10) * 10);
    }

    this.device = device;
    this.zoom = zoom || 100;
  };

  @observable
  public zoom = 100;

  @action
  public plusZoom = () => {
    if (this.zoom + 10 > 100) {
      return;
    }
    this.zoom += 10;
  };

  @action
  public minZoom = () => {
    if (this.zoom <= 20) {
      return;
    }
    this.zoom -= 10;
  };

  @action
  public resetZoom = () => {
    this.zoom = 100;
  };
}

export const editStore = new EditStore();
