import './states';
import * as React from 'react';
import { useMount } from 'react-use';
import { Spin } from 'antd';
import { initStore } from 'states';
import { Simulator } from 'widgets/Simulator';
import { Renderer, WithRerender } from 'components/Renderer';
import { MaterialsView } from 'components/MaterialsView';
import { AttributesEditor } from 'components/AttributesEditor';
import { Header } from 'components/Header';
import { HotAreaManager } from 'components/HotAreaManager';
import { parseDSL, restoreState } from './utils';

export function App() {
  const [loading, setLoading] = React.useState<boolean>(true);

  useMount(async () => {
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

async function init() {
  await initStore();
  try {
    restore();
  } catch (e) {
    console.error(e);
  }
  return;
}

export function restore() {
  // TODO
  const dslString = localStorage.getItem('dsl');
  if (!dslString) {
    return;
  }
  const dsl = parseDSL(JSON.parse(dslString));
  console.log(dsl);
  restoreState(dsl);
}
