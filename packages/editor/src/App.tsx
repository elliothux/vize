import * as React from "react";
import { useMount } from "react-use";
import { Spin } from "antd";
import { Header } from "./components/Header";
import { Simulator } from "./components/Simulator";
import { Renderer } from "./components/Render";
import { materialsStore } from "./states";

export function App() {
  const [loading, setLoading] = React.useState<boolean>(true);

  useMount(async () => {
    await init();
    setLoading(false);
  });

  return (
    <Spin
      spinning={loading}
      tip="loading"
      size="large"
      wrapperClassName="editor-loading"
    >
      <Header />
      <Simulator>{loading ? null : <Renderer />}</Simulator>
    </Spin>
  );
}

function init() {
  return materialsStore.init();
}
