import { EventEmitTypes, events } from './eventEmiter';
import { noop } from './common';
import { injectRuntime } from '../components/Renderer/utils';

export function initDocument(doc: Document, callback: Function = noop) {
  injectRuntime(window);

  doc.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  doc.addEventListener('click', e => {
    events.emit(EventEmitTypes.GLOBAL_CLICK, e);
  });

  callback();
}
