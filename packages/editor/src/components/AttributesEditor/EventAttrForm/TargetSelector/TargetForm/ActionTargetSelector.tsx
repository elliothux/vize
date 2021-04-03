import * as React from 'react';
import * as R from 'ramda';
import { useCallback, useMemo, useState } from 'react';
import { ActionEventTarget, EventTargetType, EventTriggerName, Maybe } from 'types';
import { Button, Select } from 'antd';
import { eventStore } from 'states';
import { FiLayers, FiPlus } from 'react-icons/fi';
import { materialsActionMetaMap, getMaterialsActionMeta } from 'runtime';
import { Trans } from 'react-i18next';
import { i18n } from 'i18n';
import { DEFAULT_MAX_TIMEOUT } from './constant';

interface Props {
  trigger: Maybe<EventTriggerName>;
  setTrigger: (trigger: Maybe<EventTriggerName>) => void;
}

const { Option: SelectOption, OptGroup } = Select;

export function ActionTargetSelector({ trigger, setTrigger }: Props) {
  const [actionId, setActionId] = useState<Maybe<string>>(null);

  const { universalActions, nonUniversalActions } = useMemo(() => {
    return R.groupBy(
      ({ isBuildIn }) => (isBuildIn ? 'universalActions' : 'nonUniversalActions'),
      R.values(Object.fromEntries(materialsActionMetaMap)),
    );
  }, []);

  const onAddAction = useCallback(() => {
    const { identityName, lib, maxTimeout = DEFAULT_MAX_TIMEOUT } = getMaterialsActionMeta(actionId!)!;
    eventStore.addEventInstance(trigger!, {
      type: EventTargetType.ACTION,
      id: identityName,
      lib,
      maxTimeout,
    } as ActionEventTarget);
    setActionId(null);
    setTrigger(null);
  }, [trigger, actionId]);

  return (
    <>
      <div className="event-form-prop-item">
        <span>
          <Trans>Target Action</Trans>:
        </span>
        <Select
          value={actionId || undefined}
          onChange={setActionId}
          className="event-form-selector"
          dropdownClassName="event-form-selector-options"
        >
          {nonUniversalActions ? (
            <OptGroup label={i18n.t('Business custom actions')}>
              {nonUniversalActions.map(({ identityName, info: { name } }) => (
                <SelectOption value={identityName} key={identityName}>
                  <FiLayers />
                  {name}
                </SelectOption>
              ))}
            </OptGroup>
          ) : null}

          {universalActions ? (
            <OptGroup label={i18n.t('Universal actions')}>
              {universalActions.map(({ identityName, info: { name } }) => (
                <SelectOption value={identityName} key={identityName}>
                  <FiLayers />
                  {name}
                </SelectOption>
              ))}
            </OptGroup>
          ) : null}
        </Select>
      </div>

      <Button
        disabled={!(actionId && trigger)}
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
