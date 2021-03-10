import hotkeys from 'hotkeys-js';
import { EventProxy } from 'runtime/utils/eventProxy';
import { preventSyntheticEvent } from './eventHelper';

export enum HotKeyEventTypes {
  SAVE = 'save',
  SAVE_AS_TEMPLATE = 'save_as_template',
  UNDO = 'undo',
  REDO = 'redo',
  PREVIEW = 'preview',
  TOGGLE_PREVIEW = 'toggle_preview',
  PUBLISH = 'publish',
  DELETE = 'delete',
  TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN',
}

export const hotkeyEvents = new EventProxy<HotKeyEventTypes>();

let lastPress = 0;
const DEBOUNCE_TIMEOUT = 500;

export function registerHotkey(element: Document) {
  const options = { scope: 'all', element: (element || window.document) as any };
  const handlerWrapper = (handler: Function) => (e: KeyboardEvent) => {
    if (e.target !== options.element && !options.element.body.contains(e.target)) {
      return;
    }

    preventSyntheticEvent(e);
    if (Date.now() - lastPress > DEBOUNCE_TIMEOUT) {
      lastPress = Date.now();
      handler();
    }
  };
  const handleWrapperWithPreventInput = (handler: Function) => (e: KeyboardEvent) => {
    if (e.target !== options.element && !options.element.body.contains(e.target)) {
      return;
    }

    if (isInput(e)) {
      return;
    }

    preventSyntheticEvent(e);
    if (Date.now() - lastPress > DEBOUNCE_TIMEOUT) {
      lastPress = Date.now();
      handler();
    }
  };

  hotkeys(
    'ctrl+s,command+s',
    options,
    handlerWrapper(() => {
      hotkeyEvents.emit(HotKeyEventTypes.SAVE);
    }),
  );
  hotkeys(
    'ctrl+shift+s,command+shift+s',
    options,
    handlerWrapper(() => hotkeyEvents.emit(HotKeyEventTypes.SAVE_AS_TEMPLATE)),
  );
  hotkeys(
    'ctrl+z,command+z',
    options,
    handleWrapperWithPreventInput(() => hotkeyEvents.emit(HotKeyEventTypes.UNDO)),
  );
  hotkeys(
    'ctrl+shift+z,command+shift+z',
    options,
    handleWrapperWithPreventInput(() => hotkeyEvents.emit(HotKeyEventTypes.REDO)),
  );
  hotkeys(
    'ctrl+backspace,command+backspace',
    options,
    handleWrapperWithPreventInput(() => hotkeyEvents.emit(HotKeyEventTypes.DELETE)),
  );
  hotkeys(
    'ctrl+p,command+p',
    options,
    handlerWrapper(() => hotkeyEvents.emit(HotKeyEventTypes.TOGGLE_PREVIEW)),
  );
  hotkeys(
    'ctrl+g,command+g',
    options,
    handlerWrapper(() => hotkeyEvents.emit(HotKeyEventTypes.PREVIEW)),
  );
  hotkeys(
    'ctrl+u,command+u',
    options,
    handlerWrapper(() => hotkeyEvents.emit(HotKeyEventTypes.PUBLISH)),
  );
  hotkeys(
    'ctrl+f,command+f',
    options,
    handlerWrapper(() => hotkeyEvents.emit(HotKeyEventTypes.TOGGLE_FULLSCREEN)),
  );

  hotkeys.filter = () => true;
}

function isInput(event: KeyboardEvent) {
  return /^(INPUT|TEXTAREA|SELECT)$/.test((event.target as Element).tagName);
}
