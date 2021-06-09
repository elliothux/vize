import { configure } from 'mobx';
import { EventEmitTypes, events } from 'libs';
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
  events.emit(EventEmitTypes.STORE_INITIALED);
}

export * from './components';
export * from './edit';
export * from './events';
export * from './global';
export * from './materials';
export * from './pages';
export * from './plugins';
export * from './select';
export * from './shared';
export * from './hotAreas';
