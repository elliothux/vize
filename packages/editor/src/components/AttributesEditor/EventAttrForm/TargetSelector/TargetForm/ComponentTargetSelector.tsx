import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ComponentEventTarget, EventTargetType, EventTriggerName, Maybe } from 'types';
import { observer } from 'mobx-react';
import { eventStore, selectStore } from 'states';
import { Button, Select } from 'antd';
import { FiChevronsLeft, FiLayers, FiMousePointer, FiPlus, FiX } from 'react-icons/fi';
import { useComponentMeta } from 'hooks';
import { useUnmount } from 'react-use';
import { Trans, useTranslation } from 'react-i18next';
import { DEFAULT_MAX_TIMEOUT } from './constant';

interface Props {
  trigger: Maybe<EventTriggerName>;
  setTrigger: (trigger: Maybe<EventTriggerName>) => void;
}

const { Option: SelectOption } = Select;

function IComponentTargetSelector({ trigger, setTrigger }: Props) {
  const { t } = useTranslation();
  const [target, setTarget] = useState<Maybe<Omit<ComponentEventTarget, 'type'>>>(null);

  const { selectMode, selectModeSelectedComponent } = selectStore;
  const { key } = selectModeSelectedComponent || {};
  const { eventName, maxTimeout = DEFAULT_MAX_TIMEOUT } = target || {};

  const onStartSelect = useCallback(() => selectStore.setSelectMode(true), []);

  const onEndSelect = useCallback(() => {
    selectStore.setSelectMode(false);
    setTarget(null);
  }, []);

  const onAddAction = useCallback(() => {
    eventStore.addEventInstance(trigger!, {
      type: EventTargetType.Component,
      eventName: eventName!,
      key: key!,
      maxTimeout,
    } as ComponentEventTarget);
    onEndSelect();
    setTrigger(null);
  }, [trigger, eventName, key]);

  const meta = useComponentMeta(key || -1);
  const onChangeEvent = useCallback((eventName: string) => setTarget({ eventName, key: key!, maxTimeout }), [key]);

  useEffect(() => setTarget(null), [key]);
  useUnmount(onEndSelect);

  const disabled = !(trigger && key && eventName);

  return (
    <>
      <div className="event-form-prop-item component-target-selector">
        <span>
          <Trans>Target Comp</Trans>:
        </span>
        {selectMode ? (
          <Button onClick={onEndSelect} className="component-target-selector-button">
            <div className="show">
              {key ? (
                <span>{`${t('Selected')}（key=${key}）`}</span>
              ) : (
                <>
                  <FiChevronsLeft className="component-target-selector-button-icon" />
                  <span>
                    {' '}
                    <Trans>Select target component</Trans>
                  </span>
                </>
              )}
            </div>

            <div className="hide">
              <FiX />
              <span>
                {' '}
                <Trans>Cancel select</Trans>
              </span>
            </div>
          </Button>
        ) : (
          <Button onClick={onStartSelect} className="component-target-selector-button">
            <FiMousePointer />
            <span>
              {' '}
              <Trans>Select component</Trans>
            </span>
          </Button>
        )}
      </div>

      {meta ? (
        <div className="event-form-prop-item component-target-selector">
          <span>
            <Trans>Target Action</Trans>:
          </span>
          <Select
            value={eventName}
            onChange={onChangeEvent}
            className="event-form-selector"
            dropdownClassName="event-form-selector-options"
          >
            {meta?.onEvents?.map(({ displayName, eventName }) => (
              <SelectOption value={eventName} key={eventName}>
                <FiLayers />
                {displayName}
              </SelectOption>
            ))}
          </Select>
        </div>
      ) : null}

      <Button disabled={disabled} type="primary" className="event-form-target-selector-add" onClick={onAddAction}>
        <FiPlus />
        <span>
          <Trans>Add</Trans>
        </span>
      </Button>
    </>
  );
}

export const ComponentTargetSelector = observer(IComponentTargetSelector);
