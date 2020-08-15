import { EventProxy } from './eventProxy';

export enum EventEmitTypes {
    GLOBAL_CLICK = 'global_click',
    SET_MATERIALS_VIEW_TYPE = 'set_materials_view_type',
    SET_ATTRIBUTES_EDITOR_TYPE = 'set_attributes_editor_type',
    JUMP_ATTR_EDIT_TAB = 'jump_attr_edit_tab',
    CHANGE_ATTR_EDIT_TAB = 'change_attr_edit_tab',
}

export const events = new EventProxy<EventEmitTypes>();
