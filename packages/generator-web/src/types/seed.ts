export interface Seeds {
  components: {
    [identityName: string]: SeedItem<SeedItemType.Component>;
  };
  plugins: {
    [identityName: string]: SeedItem<SeedItemType.Plugin>;
  };
  actions: {
    [identityName: string]: SeedItem<SeedItemType.Action>;
  };
}

export interface SeedItem<T extends SeedItemType = SeedItemType> {
  type: T;
  lib: string;
  name: string;
}

export enum SeedItemType {
  Component = 'component',
  Plugin = 'plugin',
  Action = 'action',
}
