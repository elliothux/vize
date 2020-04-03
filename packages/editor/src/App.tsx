import * as React from "react";
import { useMount } from "react-use";
import { Spin } from "antd";
import { Header } from "./components/Header";
import { SandboxRender } from "./components/SandboxRender";
import { Simulator } from "./components/Simulator";
import { loadMaterials } from "./utils";
import { globalStore } from "./states";

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
      <Simulator>
        <SandboxRender mountTarget="#vize-main-entry">
          {doc => {
            console.log(doc);
            return <h1>hello</h1>;
          }}
        </SandboxRender>
      </Simulator>
    </Spin>
  );
}

async function init() {
  const { libName, debugPort } = globalStore;
  await loadMaterials(libName, debugPort || undefined);
}
