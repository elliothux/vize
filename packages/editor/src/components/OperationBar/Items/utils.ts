import { noop, withMessage } from 'utils';

export const unImplemented = withMessage(noop, '该功能开发中', 'warn');
