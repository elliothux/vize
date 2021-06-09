import { TimeTravelerConfig } from './types';

export const config: TimeTravelerConfig = {
  maxStacks: 50,
  debounceTime: 2000,
};

export function configure(newConfig: Partial<TimeTravelerConfig>) {
  return Object.assign(config, newConfig);
}
