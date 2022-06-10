import * as React from 'react';
import { observer } from 'mobx-react';
import { MaterialsComponentMeta, Maybe } from '@vize/types';
import { selectStore } from 'states';
import { materialsComponentMetaMap } from '@vize/runtime-web';
import { WithTagsList } from '../WithTagsList';
import { MaterialsViewType } from '../../HeaderOptions';
import { MaterialsComponentItem } from './MaterialsComponentItem';
import { MaterialsComponentPreview } from './MaterialsComponentPreview';

interface State {
  currentComponent: Maybe<MaterialsComponentMeta>;
}

@observer
export class ComponentsLibrary extends React.Component {
  public state: State = {
    currentComponent: null,
  };

  private onSelectItem = (currentComponent: MaterialsComponentMeta) => {
    this.setState({ currentComponent });
  };

  private renderItem = (currentContainerComponentKey: number) => (item: MaterialsComponentMeta) => {
    const { currentComponent } = this.state;
    return (
      <MaterialsComponentItem
        key={item.identityName}
        item={item}
        currentItem={currentComponent ? currentComponent.identityName : null}
        onSelect={this.onSelectItem}
        currentContainerComponentKey={currentContainerComponentKey}
      />
    );
  };

  private renderPreview = () => {
    const { currentComponent } = this.state;
    if (!currentComponent) {
      return null;
    }
    return <MaterialsComponentPreview item={currentComponent} />;
  };

  public render() {
    return (
      <div className="vize-components-library">
        <WithTagsList<MaterialsComponentMeta>
          view={MaterialsViewType.COMPONENTS}
          itemsMap={Object.fromEntries(materialsComponentMetaMap)}
        >
          {this.renderItem(selectStore.containerComponentKey)}
        </WithTagsList>
        {this.renderPreview()}
      </div>
    );
  }
}
