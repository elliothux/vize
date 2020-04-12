import * as React from "react";
import { observer } from "mobx-react";
import { WithTagsList } from "../WithTagsList";
import { MaterialsViewType } from "../../HeaderOptions";
import { MaterialsComponentMeta } from "../../../../types";
import { materialsStore } from "../../../../states";

@observer
export class ComponentsLibrary extends React.Component {
  private renderItem = (item: MaterialsComponentMeta) => {
    return <div key={item.identityName}>{item.identityName}</div>;
  };

  public render() {
    return (
      <div className="vize-components-library">
        <WithTagsList
          view={MaterialsViewType.COMPONENTS}
          itemsMap={materialsStore.components}
        >
          {this.renderItem}
        </WithTagsList>
      </div>
    );
  }
}
