import { EventEmitTypes, events } from './eventEmiter';
import { noop } from './common';
import { registerHotkey } from './hotkey';

export function initDocument(doc: Document, callback: Function = noop) {
  registerHotkey(document);

  doc.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  doc.addEventListener('click', e => {
    events.emit(EventEmitTypes.GLOBAL_CLICK, e);
  });

  callback();
}
