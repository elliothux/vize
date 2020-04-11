import { EventProxy } from "./eventProxy";

export enum EventEmitTypes {
  GLOBAL_CLICK = "global_click"
}

export const events = new EventProxy<EventEmitTypes>();
