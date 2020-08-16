import * as React from 'react';
import { useMount } from 'react-use';
import { Spin } from 'antd';
import { Header } from './components/Header';
import { Simulator } from './components/Simulator';
import { Renderer } from './components/Renderer';
import { initStore } from './states';
import { MaterialsView } from './components/MaterialsView';
import { AttributesEditor } from './components/AttributesEditor';

export function App() {
  const [loading, setLoading] = React.useState<boolean>(true);

  useMount(async () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    await init();
    setLoading(false);
  });

  return (
    <Spin spinning={loading} tip="loading" size="large" wrapperClassName="editor-loading">
      <Header />
      <main className="vize-main">
        <MaterialsView loading={loading} />
        <Simulator>{loading ? null : <Renderer />}</Simulator>
        <AttributesEditor loading={loading} />
      </main>
    </Spin>
  );
}

function init() {
  return initStore();
}
