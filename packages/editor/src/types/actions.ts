import { MaterialsForm, MaterialsInfo } from './materials';
import { MaterialsCustomEvent } from './events';
import { PageMeta } from './pages';

export interface MaterialsActionMeta {
    identityName: string;
    lib: string;
    name: string;
    readonly thumb: string;
    readonly info: MaterialsInfo;
    readonly dataForm?: MaterialsForm;
    readonly emitEvents?: MaterialsCustomEvent[];
}

export interface ActionInstance {
    key: Readonly<number>;
    action: Readonly<string>;
    data: { [key: string]: any };
    trigger: ActionTrigger;
    actions: ActionInstance | ComponentActionsInstance;
}

export interface ComponentActionsInstance extends Exclude<ActionInstance, 'actions'> {
    target: number;
}

export const ACTION_TRIGGER_PREFIX = '__vize_action_trigger_';

export enum BaseActionTrigger {
    INIT = '__vize_action_trigger_init',
    CLICK = '__vize_action_trigger_click',
    MOUSE_ENTER = '__vize_action_trigger_mouseEnter',
    MOUSE_LEAVE = '__vize_action_trigger_mouseLeave',
    DOUBLE_CLICK = '__vize_action_trigger_double_click',
    LONG_PRESS = '__vize_action_trigger_long_press',
    ENTER_VIEW = '__vize_action_trigger_enter_view',
    LEAVE_VIEW = '__vize_action_trigger_leave_view',
}

export type ActionTrigger = BaseActionTrigger | 'string';

// TODO
export interface ActionParams {
    data: object;
    global: object;
    meta: PageMeta;
}

export type MaterialsAction = (params: ActionParams) => void;
