import * as R from 'ramda';
import { promiseWrapper } from 'utils';
import { editStore, initStore } from 'states';
import { getCurrentUser } from 'api';
import { initI18N } from '@vize/i18n';
import { message } from 'antd';
import { timeTraveler } from 'mobx-time-traveler';
import { registerHotkey } from './hotkey';
import { EventEmitTypes, events } from './events';
import { restore } from './dsl';

export async function init() {
  await Promise.all([initStore(), getCurrentUser(), initI18N]);
  await restore();
  initDocument(document);
  initHotReload();
  timeTraveler.initSnapshots();
}

export function initDocument(doc: Document) {
  registerHotkey(document);
  doc.addEventListener('contextmenu', e => e.preventDefault());
  doc.addEventListener('click', R.partial(events.emit, [EventEmitTypes.GLOBAL_CLICK]));
}

function initHotReload() {
  return setTimeout(async () => {
    const {
      debugPorts: [port],
    } = editStore;

    if (!port) {
      return;
    }

    const [err, module] = await promiseWrapper(import('externals/dev/hotReload'));
    if (err) {
      console.error(err);
      return message.error('HotReload bootstrap error');
    }
    module!.initMaterialsHotReload(port);
  }, 1000);
}
