import { TimeTravelerConfig } from './types';

export const config: TimeTravelerConfig = {
  maxStacks: 20,
};

export function configure(newConfig: Partial<TimeTravelerConfig>) {
  return Object.assign(config, newConfig);
}
