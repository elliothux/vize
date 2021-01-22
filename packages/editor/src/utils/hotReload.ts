import { message } from 'antd';
import { debounce } from 'throttle-debounce';
import { EventEmitTypes, events } from './eventEmiter';

enum HotReloadCommand {
  CONNECTED = 'connected',
  RECOMPILE = 'recompile',
  RELOAD = 'reload',
}

export function initMaterialsHotReload(debugPort: number) {
  const sock = new WebSocket(`ws://127.0.0.1:${1 + debugPort}/__vize-materials-hot-reload-dev-server`);

  sock.addEventListener('message', debounce(200, onReceiveMessage));

  sock.addEventListener('close', () => {
    log('Socket connection closed.');
  });
}

function onReceiveMessage({ type, data: command }: MessageEvent) {
  if (type !== 'message') {
    return;
  }

  switch (command) {
    case HotReloadCommand.RECOMPILE: {
      message.destroy();
      log('Start recompile materials...');
      message.loading('构建物料库', 0);
      return;
    }
    case HotReloadCommand.RELOAD: {
      message.destroy();
      log('Reload materials...');
      message.loading('重新加载物料', 0);
      events.emit(EventEmitTypes.RELOAD_MATERIALS);
      return;
    }
    case HotReloadCommand.CONNECTED: {
      message.destroy();
      log('Hot reload server connected');
      return;
    }
    default: {
      log('Received command: ', command);
    }
  }
}

function log(...content: string[]) {
  return console.log('[🔥Vize CLI Hot Reload] ', ...content);
}
