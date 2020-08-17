import * as React from 'react';
import * as R from 'ramda';
import { EventTriggerType, Maybe } from 'types';
import { Button, Select } from 'antd';
import { useMemo } from 'react';
import { materialsStore } from 'states';
import { FiLayers, FiPlus } from 'react-icons/fi';

interface Props {
  actionId: Maybe<string>;
  setAction: (id: string) => void;
  trigger: Maybe<EventTriggerType>;
}

const { Option: SelectOption, OptGroup } = Select;

export function ActionTargetSelector({ actionId, setAction, trigger }: Props) {
  const onChange = useMemo(() => R.unary(setAction), []);
  const { universalActions, nonUniversalActions } = useMemo(() => {
    return R.groupBy(
      ({ isBuildIn }) => (isBuildIn ? 'universalActions' : 'nonUniversalActions'),
      R.values(materialsStore.actions),
    );
  }, []);

  return (
    <>
      <div className="event-form-prop-item">
        <span>执行动作:</span>
        <Select
          value={actionId || undefined}
          onChange={onChange}
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

      <Button disabled={!(actionId && trigger)} type="primary" className="event-form-target-selector-add">
        <FiPlus />
        <span>添加事件</span>
      </Button>
    </>
  );
}
