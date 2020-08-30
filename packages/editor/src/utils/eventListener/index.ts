import {
  ComponentEventListenerCallback,
  EventListenerTarget,
  HotAreaEventListenerCallback,
  HotAreaEventListenerTypes,
  PageEventListenerCallback,
  PageEventListenerTypes,
} from './types';
import { ComponentEventListenerTypes } from 'types';
// import { onComponent } from './componentEventListener';
// import { onPage } from './pageEventListener';
import { onHotArea } from './hotAreaEventListener';

export function on(
  target: EventListenerTarget,
  eventType: ComponentEventListenerTypes | PageEventListenerTypes | HotAreaEventListenerTypes,
  callback: ComponentEventListenerCallback | PageEventListenerCallback | HotAreaEventListenerCallback,
): void {
  switch (target) {
    // case EventListenerTarget.PAGE: {
    //   return onPage(eventType as PageEventListenerTypes, callback as PageEventListenerCallback);
    // }
    // case EventListenerTarget.COMPONENT: {
    //   return onComponent(
    //     eventType as ComponentEventListenerTypes,
    //     callback as ComponentEventListenerCallback
    //   );
    // }
    case EventListenerTarget.HOT_AREA: {
      return onHotArea(eventType as HotAreaEventListenerTypes, callback as HotAreaEventListenerCallback);
    }
    default: {
      throw new Error(
        `Invalid [target], must one of '${EventListenerTarget.PAGE}', '${EventListenerTarget.COMPONENT}', '${EventListenerTarget.HOT_AREA}'`,
      );
    }
  }
}
export * from './hotAreaEventListener';
