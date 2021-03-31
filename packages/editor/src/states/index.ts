import { configure } from 'mobx';
import { pagesStore } from './pages';
import { materialsStore } from './materials';
import { globalStore } from './global';

configure({
  enforceActions: 'always',
});

export async function initStore() {
  await materialsStore.init();
  pagesStore.init();
  globalStore.init();
}

export * from './components';
export * from './edit';
export * from './events';
export * from './global';
export * from './history';
export * from './materials';
export * from './pages';
export * from './plugins';
export * from './select';
export * from './shared';
export * from './hotAreas';
