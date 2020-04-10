import * as React from "react";
import { observer } from "mobx-react";
import { PlusOutlined, UpOutlined } from "@ant-design/icons";
import { pagesStore } from "../../../states";
import { PageInstance } from "../../../types";
import classNames from "classnames";
import "./index.scss";

@observer
export class PagesList extends React.Component {
  private addPage = () => {
    pagesStore.addPage(false);
  };

  private renderHeader = () => {
    return (
      <header>
        <p>页面</p>
        <div>
          <PlusOutlined onClick={this.addPage} />
          <UpOutlined />
        </div>
      </header>
    );
  };

  private renderPageItem = (
    { name, key, isHome }: PageInstance,
    index: number,
    currentPage: PageInstance
  ) => {
    return (
      <div
        className={classNames("page-item", {
          activated: currentPage.key === key
        })}
        onClick={() => pagesStore.setCurrentPage(index)}
        key={key.toString()}
      >
        {name}
      </div>
    );
  };

  public render() {
    const { pages, currentPage } = pagesStore;

    return (
      <div className="vize-pages-list">
        {this.renderHeader()}
        <main>
          {pages.map((page, index) =>
            this.renderPageItem(page, index, currentPage)
          )}
        </main>
      </div>
    );
  }
}
