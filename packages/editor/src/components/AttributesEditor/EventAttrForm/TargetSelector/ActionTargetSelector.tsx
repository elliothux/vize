import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import * as R from 'ramda';
import { EventTargetType, EventTriggerName, Maybe } from 'types';
import { Button, Select } from 'antd';
import { eventStore } from 'states';
import { FiLayers, FiPlus } from 'react-icons/fi';
import { materialsActionMetaMap, getMaterialsActionMeta } from 'runtime';
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
    eventStore.addEventInstance(trigger!, { type: EventTargetType.ACTION, id: identityName, lib, maxTimeout });
    setActionId(null);
    setTrigger(null);
  }, [trigger, actionId]);

  return (
    <>
      <div className="event-form-prop-item">
        <span>执行动作:</span>
        <Select
          value={actionId || undefined}
          onChange={setActionId}
          className="event-form-selector"
          dropdownClassName="event-form-selector-options"
        >
          {nonUniversalActions ? (
            <OptGroup label="业务自定义动作">
              {nonUniversalActions.map(({ identityName, info: { name } }) => (
                <SelectOption value={identityName} key={identityName}>
                  <FiLayers />
                  {name}
                </SelectOption>
              ))}
            </OptGroup>
          ) : null}

          {universalActions ? (
            <OptGroup label="通用动作">
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
        <span>添加事件</span>
      </Button>
    </>
  );
}
