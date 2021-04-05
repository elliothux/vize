import * as React from 'react';
import * as R from 'ramda';
import { useMemo } from 'react';
import { Select } from 'antd';
import { FiLayers } from 'react-icons/fi';
import { SelectType } from 'states';
import { Trans, useTranslation } from 'react-i18next';
import { getTriggerDisplayName } from '../utils';
import { TriggerSelectorProps } from './types';

const { Option: SelectOption, OptGroup } = Select;

export function EventTriggerSelector({
  type,
  triggerType,
  trigger,
  setTrigger,
  customEvents,
  universalEventTriggers,
}: TriggerSelectorProps) {
  const { t } = useTranslation();
  const onChange = useMemo(() => R.unary(setTrigger), []);
  const title = useMemo(() => {
    const s = type === SelectType.COMPONENT ? 'Component' : type === SelectType.PLUGIN ? 'Plugin' : 'Container';
    return `${t(s)}${t(' custom triggers')}`;
  }, [type]);

  return (
    <div className="event-form-prop-item">
      <span>
        <Trans>Trigger</Trans>:
      </span>
      <Select
        value={trigger || undefined}
        onChange={onChange}
        className="event-form-selector"
        dropdownClassName="event-form-selector-options"
      >
        {customEvents?.length ? (
          <OptGroup label={title}>
            {customEvents.map(({ eventName, displayName }) => (
              <SelectOption value={eventName} key={eventName}>
                <FiLayers />
                {displayName}
              </SelectOption>
            ))}
          </OptGroup>
        ) : null}

        <OptGroup label={t('Universal triggers')}>
          {universalEventTriggers.map(trigger => {
            const [text, Icon] = getTriggerDisplayName({ type: triggerType, triggerName: trigger });
            return (
              <SelectOption value={trigger} key={trigger}>
                <Icon />
                {text}
              </SelectOption>
            );
          })}
        </OptGroup>
      </Select>
    </div>
  );
}
