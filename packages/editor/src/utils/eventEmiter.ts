import { EventProxy } from './eventProxy';

export enum EventEmitTypes {
    GLOBAL_CLICK = 'global_click',
    SET_MATERIALS_VIEW_TYPE = 'set_materials_view_type',
}

export const events = new EventProxy<EventEmitTypes>();
