import * as React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { PlusOutlined, UpOutlined } from "@ant-design/icons";
// import { Rnd } from "react-rnd";
import "./index.scss";

const { TabPane } = Tabs;

@observer
export class MaterialsView extends React.Component {
  private renderPages = () => {
    return (
      <div className="pages">
        <header>
          <p>页面</p>
          <div>
            <PlusOutlined />
            <UpOutlined />
          </div>
        </header>
        <main>
          <div className="page-item activated">首页</div>
          <div className="page-item">分享页</div>
        </main>
      </div>
    );
  };

  private renderSearch = () => {
    return null;
  };

  public render() {
    return (
      <div className="vize-materials-view">
        {this.renderPages()}
        {this.renderSearch()}
      </div>
    );
  }
}
