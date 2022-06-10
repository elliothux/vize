import * as React from 'react';
import { useMemo } from 'react';
import { ActionEventTarget, ComponentEventTarget, EventTarget, EventTargetType, MaterialsCustomEvent } from '@vize/types';
import { useActionMetaById, useComponentMeta, usePluginMeta } from 'hooks';
import { FiLayers } from 'react-icons/fi';
import { getMaterialsContainerMeta } from 'libs';

interface TargetProps {
  target: EventTarget;
}

export function EventInstanceTarget({ target }: TargetProps) {
  const id = (target as ActionEventTarget).id;
  const key = (target as ComponentEventTarget).key;
  const eventName = (target as ComponentEventTarget).eventName;

  const action = useActionMetaById(id || '');
  const component = useComponentMeta(key || -1);
  const plugin = usePluginMeta(key || -1);
  const container = getMaterialsContainerMeta();

  const displayEventName = useMemo(() => {
    if (action) {
      return null;
    }
    let events: MaterialsCustomEvent[];
    if (target.type === EventTargetType.Component) {
      events = component!.onEvents || [];
    } else if (target.type === EventTargetType.Plugin) {
      events = plugin!.onEvents || [];
    } else if (target.type === EventTargetType.Global) {
      events = container!.globalOnEvents || [];
    } else {
      events = container!.pageOnEvents || [];
    }
    return events.find(i => i.eventName === eventName)!.displayName;
  }, [action, component, plugin, eventName]);

  switch (target.type) {
    case EventTargetType.Global: {
      return (
        <p className="event_instance_target">
          <FiLayers />
          <span>
            {container!.info.name} {displayEventName}
          </span>
        </p>
      );
    }
    case EventTargetType.Action: {
      return (
        <p className="event_instance_target">
          <FiLayers />
          <span>{action!.info.name}</span>
        </p>
      );
    }
    case EventTargetType.Plugin: {
      return (
        <p className="event_instance_target">
          <FiLayers />
          <span>
            {plugin!.info.name} (key={key}) {displayEventName}
          </span>
        </p>
      );
    }
    case EventTargetType.Component: {
      return (
        <p className="event_instance_target">
          <FiLayers />
          <span>
            {component!.info.name} (key={key}) {displayEventName}
          </span>
        </p>
      );
    }
  }

  return null;
}
