import * as React from 'react';
import { useMount } from 'react-use';
import { Spin } from 'antd';
import { initStore } from 'states';
import { Simulator } from 'widgets/Simulator';
import { Header } from 'components/Header';
import { Renderer, WithRerender } from 'components/Renderer';
import { MaterialsView } from 'components/MaterialsView';
import { AttributesEditor } from 'components/AttributesEditor';
import { HotAreaManager } from 'components/HotAreaManager';

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
        <Simulator>
          {loading ? null : (
            <WithRerender>
              <Renderer />
            </WithRerender>
          )}
        </Simulator>
        <AttributesEditor loading={loading} />
      </main>
      <HotAreaManager />
    </Spin>
  );
}

function init() {
  return initStore();
}
