import { EventProxy } from './eventProxy';

export enum EventEmitTypes {
  GLOBAL_CLICK = 'global_click',
  MANAGE_HOT_AREA = 'manage_hot_area',
  SET_MATERIALS_VIEW_TYPE = 'set_materials_view_type',
  SET_ATTRIBUTES_EDITOR_TYPE = 'set_attributes_editor_type',
  JUMP_ATTR_EDIT_TAB = 'jump_attr_edit_tab',
  CHANGE_ATTR_EDIT_TAB = 'change_attr_edit_tab',
  COMPONENT_INTERSECTING_CHANGE = 'component_intersecting_change',
  RELOAD_RENDERER = 'reload_renderer',
}

export const events = new EventProxy<EventEmitTypes>();
