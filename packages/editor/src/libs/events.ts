import { EventProxy } from 'runtime';

export enum EventEmitTypes {
  GLOBAL_CLICK = 'global_click',
  MANAGE_HOT_AREA = 'manage_hot_area',
  SET_MATERIALS_VIEW_TYPE = 'set_materials_view_type',
  JUMP_ATTR_EDIT_TAB = 'jump_attr_edit_tab',
  CHANGE_ATTR_EDIT_TAB = 'change_attr_edit_tab',
  RELOAD_RENDERER = 'reload_renderer',
  RELOAD_MATERIALS = 'reload_materials',
  CHOOSE_RESOURCES = 'choose_resources',
}

export const events = new EventProxy<EventEmitTypes>();
