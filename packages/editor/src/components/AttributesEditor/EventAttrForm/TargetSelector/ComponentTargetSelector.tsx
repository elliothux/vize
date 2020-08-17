import * as React from 'react';
import { EventTriggerType, Maybe } from 'types';
import { observer } from 'mobx-react';
import { globalStore } from 'states';
import { useCallback, useEffect } from 'react';
import { Button, Select } from 'antd';
import { FiMousePointer, FiChevronsLeft, FiX, FiLayers, FiPlus } from 'react-icons/fi';
import { useComponentMeta } from 'hooks';
import { useUnmount } from 'react-use';

interface Props {
  component: Maybe<[number, Maybe<string>]>;
  setComponent: (component: Maybe<[number, Maybe<string>]>) => void;
  trigger: Maybe<EventTriggerType>;
}

const { Option: SelectOption } = Select;

function IComponentTargetSelector({ component, setComponent, trigger }: Props) {
  const { selectMode, selectModeSelectedComponent } = globalStore;

  const onStartSelect = useCallback(() => globalStore.setSelectMode(true), []);
  const onEndSelect = useCallback(() => {
    globalStore.setSelectMode(false);
    setComponent(null);
  }, []);

  const { key } = selectModeSelectedComponent || {};
  const [, event] = component || [];

  const meta = useComponentMeta(key || -1);
  const onChangeEvent = useCallback((event: string) => setComponent([key!, event]), [key]);

  useEffect(() => setComponent(null), [key]);
  useUnmount(onEndSelect);

  const disabled = !(trigger && key && event);

  return (
    <>
      <div className="event-form-prop-item component-target-selector">
        <span>目标组件:</span>
        {selectMode ? (
          <Button onClick={onEndSelect} className="component-target-selector-button">
            <div className="show">
              {key ? (
                <span>{`已选择（key=${key}）`}</span>
              ) : (
                <>
                  <FiChevronsLeft className="component-target-selector-button-icon" />
                  <span> 点击左侧组件以选择</span>
                </>
              )}
            </div>

            <div className="hide">
              <FiX />
              <span> 取消选择</span>
            </div>
          </Button>
        ) : (
          <Button onClick={onStartSelect} className="component-target-selector-button">
            <FiMousePointer />
            <span> 点击选择</span>
          </Button>
        )}
      </div>

      {meta ? (
        <div className="event-form-prop-item component-target-selector">
          <span>执行动作:</span>
          <Select
            value={event || undefined}
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

      <Button disabled={disabled} type="primary" className="event-form-target-selector-add">
        <FiPlus />
        <span>添加</span>
      </Button>
    </>
  );
}

export const ComponentTargetSelector = observer(IComponentTargetSelector);
