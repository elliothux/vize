type Handler = (...args: any) => void;

interface Proxies {
  [eventName: string]: Handler[];
}

export class EventProxy<T extends string> {
  private proxies: Proxies = {};

  private onceProxies: Proxies = {};

  on = (eventName: T, handler: Handler) => {
    if (this.proxies[eventName]) {
      return this.proxies[eventName].push(handler);
    }
    this.proxies[eventName] = [handler];
  };

  only = (eventName: T, handler: Handler) => {
    this.proxies[eventName] = [handler];
  };

  once = (eventName: T, handler: Handler) => {
    if (this.onceProxies[eventName]) {
      return this.onceProxies[eventName].push(handler);
    }
    this.onceProxies[eventName] = [handler];
  };

  emit = (eventName: T, ...args: any) => {
    if (this.proxies[eventName]) {
      this.proxies[eventName].forEach(handler => handler(...args));
    }
    if (this.onceProxies[eventName]) {
      this.onceProxies[eventName].forEach(handler => handler(...args));
      this.onceProxies[eventName] = [];
    }
  };

  cancel = (eventName: T, handler: Handler) => {
    if (!this.proxies[eventName]) return;
    this.proxies[eventName] = this.proxies[eventName].filter(h => h !== handler);
  };

  cancelOnce = (eventName: T, handler: Handler) => {
    if (!this.onceProxies[eventName]) return;
    this.onceProxies[eventName] = this.onceProxies[eventName].filter(h => h !== handler);
  };

  cancelAll = (eventName: T) => {
    if (!this.proxies[eventName]) return;
    this.proxies[eventName] = [];
  };

  cancelAllOnce = (eventName: T) => {
    if (!this.onceProxies[eventName]) return;
    this.onceProxies[eventName] = [];
  };

  clear = () => {
    this.proxies = {};
    this.onceProxies = {};
  };
}
