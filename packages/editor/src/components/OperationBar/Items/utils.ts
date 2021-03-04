import { noop, withMessage } from 'utils';
import { i18n } from 'i18n';

export const unImplemented = withMessage(noop, i18n.t('This feature is still under development'), 'warn');
