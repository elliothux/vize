import { Releaser } from './releaser';

export function release() {
  const releaser = new Releaser();
  return releaser.runRelease();
}
