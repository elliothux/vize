import * as React from 'react';
import { useMemo } from 'react';
import { ActionEventTarget, ComponentEventTarget, EventTarget, EventTargetType } from 'types';
import { useActionMetaById, useComponentMeta, usePluginMeta } from 'hooks';
import { FiLayers } from 'react-icons/fi';
import { getMaterialsContainerMeta } from 'utils';

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
    return (target.type === EventTargetType.COMPONENT
      ? component
      : target.type === EventTargetType.CONTAINER
      ? container
      : plugin)!.onEvents!.find(i => i.eventName === eventName)!.displayName;
  }, [action, component, plugin, eventName]);

  switch (target.type) {
    case EventTargetType.CONTAINER: {
      return (
        <p className="event_instance_target">
          <FiLayers />
          <span>
            {container!.info.name} {displayEventName}
          </span>
        </p>
      );
    }
    case EventTargetType.ACTION: {
      return (
        <p className="event_instance_target">
          <FiLayers />
          <span>{action!.info.name}</span>
        </p>
      );
    }
    case EventTargetType.PLUGIN: {
      return (
        <p className="event_instance_target">
          <FiLayers />
          <span>
            {plugin!.info.name} (key={key}) {displayEventName}
          </span>
        </p>
      );
    }
    case EventTargetType.COMPONENT: {
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
