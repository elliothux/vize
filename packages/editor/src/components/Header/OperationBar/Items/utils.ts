import { i18n } from 'i18n';
import { isMacOS, noop, withMessage } from 'utils';

export const unImplemented = withMessage(noop, i18n.t('This feature is still under development'), 'warn');

export const hotKeyPrefix = isMacOS() ? 'Command' : 'Ctrl';
