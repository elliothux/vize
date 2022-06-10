import * as React from 'react';
import { observer } from 'mobx-react';
import { MaterialsPluginMeta, Maybe } from '@vize/types';
import { materialsPluginMetaMap } from '@vize/runtime-web';
import { WithTagsList } from '../WithTagsList';
import { MaterialsViewType } from '../../HeaderOptions';
import { MaterialsPluginItem } from './MaterialsPluginItem';
import { MaterialsPluginPreview } from './MaterialsPluginPreview';

interface State {
  currentPlugin: Maybe<MaterialsPluginMeta>;
}

@observer
export class PluginsLibrary extends React.Component {
  public state: State = {
    currentPlugin: null,
  };

  private onSelectItem = (currentPlugin: MaterialsPluginMeta) => {
    this.setState({ currentPlugin });
  };

  private renderItem = (item: MaterialsPluginMeta) => {
    const { currentPlugin } = this.state;
    return (
      <MaterialsPluginItem
        key={item.identityName}
        item={item}
        currentItem={currentPlugin ? currentPlugin.identityName : null}
        onSelect={this.onSelectItem}
      />
    );
  };

  private renderPreview = () => {
    const { currentPlugin } = this.state;
    if (!currentPlugin) {
      return null;
    }
    return <MaterialsPluginPreview item={currentPlugin} />;
  };

  public render() {
    return (
      <div className="vize-plugins-library">
        <WithTagsList<MaterialsPluginMeta>
          view={MaterialsViewType.PLUGINS}
          itemsMap={Object.fromEntries(materialsPluginMetaMap)}
        >
          {this.renderItem}
        </WithTagsList>
        {this.renderPreview()}
      </div>
    );
  }
}
