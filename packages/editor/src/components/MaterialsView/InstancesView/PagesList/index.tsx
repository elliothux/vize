import * as React from "react";
import { observer } from "mobx-react";
import { PlusOutlined, UpOutlined } from "@ant-design/icons";
import { pagesStore } from "states";
import { PageItem } from "./PageItem";
import { HeaderOptions, MaterialsViewType } from "../../HeaderOptions";
import "./index.scss";

@observer
export class PagesList extends React.Component {
  private addPage = () => {
    pagesStore.addPage(false);
  };

  private renderHeader = () => {
    return (
      <HeaderOptions type={MaterialsViewType.INSTANCES}>
        <div>
          <PlusOutlined onClick={this.addPage} />
          <UpOutlined />
        </div>
      </HeaderOptions>
    );
  };

  public render() {
    const { pages } = pagesStore;

    return (
      <div className="vize-pages-list">
        {this.renderHeader()}
        <main>
          {pages.map((page, index) => (
            <PageItem key={page.key.toString()} instance={page} index={index} />
          ))}
        </main>
      </div>
    );
  }
}
