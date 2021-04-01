import * as React from 'react';
import { useCallback, useState } from 'react';
import { ContainerEventTarget, EventTargetType, EventTriggerName, Maybe } from 'types';
import { Button, Select } from 'antd';
import { Trans } from 'react-i18next';
import { FiLayers, FiPlus } from 'react-icons/fi';
import { getMaterialsContainerMeta } from 'libs';
import { eventStore } from 'states';
import { DEFAULT_MAX_TIMEOUT } from './constant';

interface Props {
  trigger: Maybe<EventTriggerName>;
  setTrigger: (trigger: Maybe<EventTriggerName>) => void;
}

const { Option: SelectOption } = Select;

export function ContainerTargetSelector({ trigger, setTrigger }: Props) {
  const { onEvents } = getMaterialsContainerMeta()!;

  const [targetEvent, setTargetEvent] = useState<Maybe<string>>(null);

  const onAddAction = useCallback(() => {
    const { eventName, maxTimeout = DEFAULT_MAX_TIMEOUT } = onEvents!.find(i => i.eventName === targetEvent)!;
    eventStore.addEventInstance(trigger!, {
      type: EventTargetType.CONTAINER,
      eventName,
      maxTimeout,
    } as ContainerEventTarget);
    setTargetEvent(null);
    setTrigger(null);
  }, [targetEvent, trigger]);

  return (
    <>
      <div className="event-form-prop-item">
        <span>
          <Trans>Target Action</Trans>:
        </span>
        <Select
          value={targetEvent || undefined}
          onChange={setTargetEvent}
          className="event-form-selector"
          dropdownClassName="event-form-selector-options"
        >
          {onEvents?.map(({ eventName, displayName }) => (
            <SelectOption value={eventName} key={eventName}>
              <FiLayers />
              {displayName}
            </SelectOption>
          ))}
        </Select>
      </div>

      <Button
        disabled={!(targetEvent && trigger)}
        type="primary"
        className="event-form-target-selector-add"
        onClick={onAddAction}
      >
        <FiPlus />
        <span>
          <Trans>Add event</Trans>
        </span>
      </Button>
    </>
  );
}
