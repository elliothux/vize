import * as React from 'react';
import * as R from 'ramda';
import { Maybe } from 'types';
import { Select } from 'antd';
import { useMemo } from 'react';
import { materialsStore } from '../../../../states';
import { FiLayers } from 'react-icons/fi';

interface Props {
  actionId: Maybe<string>;
  setAction: (id: string) => void;
}

const { Option: SelectOption, OptGroup } = Select;

export function ActionTargetSelector({ actionId, setAction }: Props) {
  const onChange = useMemo(() => R.unary(setAction), []);
  const { universalActions, nonUniversalActions } = useMemo(() => {
    return R.groupBy(
      ({ isBuildIn }) => (isBuildIn ? 'universalActions' : 'nonUniversalActions'),
      R.values(materialsStore.actions),
    );
  }, []);

  return (
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
  );
}
