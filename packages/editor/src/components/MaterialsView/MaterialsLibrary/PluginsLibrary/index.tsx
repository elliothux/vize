import * as React from "react";
import { observer } from "mobx-react";
import { WithTagsList } from "../WithTagsList";
import { MaterialsViewType } from "../../HeaderOptions";
import { MaterialsPluginMeta } from "../../../../types";
import { materialsStore } from "../../../../states";

@observer
export class PluginsLibrary extends React.Component {
  private renderItem = (item: MaterialsPluginMeta) => {
    return <div key={item.identityName}>{item.identityName}</div>;
  };

  public render() {
    return (
      <div className="vize-plugins-library">
        <WithTagsList
          view={MaterialsViewType.PLUGINS}
          itemsMap={materialsStore.plugins}
        >
          {this.renderItem}
        </WithTagsList>
      </div>
    );
  }
}
