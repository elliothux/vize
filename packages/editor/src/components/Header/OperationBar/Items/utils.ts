import { isMacOS } from 'utils';

export const hotKeyPrefix = isMacOS() ? 'Command' : 'Ctrl';
