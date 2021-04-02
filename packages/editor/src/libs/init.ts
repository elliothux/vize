import { noop } from 'utils';
import { registerHotkey } from './hotkey';
import { EventEmitTypes, events } from './events';

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
