import './index.scss';
import * as React from 'react';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { Input } from 'antd';
import { events, EventEmitTypes, getResourceURL } from 'utils';
import { isEmpty } from 'utils';
import { FiArrowUp } from 'react-icons/fi';
import { ResourceRecord, ResourceType } from 'sharedTypes';
import classnames from 'classnames';
import { FormProps } from '../../types';

export function Image({ onChange: onFieldChange, value }: FormProps<string>) {
  const onChange = useCallback((record: ResourceRecord) => onFieldChange(getResourceURL(record)), []);

  const button = useMemo(
    () => (
      <FiArrowUp
        onClick={() => {
          events.emit(EventEmitTypes.CHOOSE_RESOURCES, ResourceType.IMAGE, false, null, onChange);
        }}
      />
    ),
    [],
  );
  const isValueEmpty = useMemo(() => isEmpty(value), [value]);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => onFieldChange(e.target.value), []);

  return (
    <div className={classnames('form-image-picker')}>
      <Input addonAfter={button} value={value} onChange={onInputChange} allowClear />
      {isValueEmpty ? null : (
        <div className="form-image-picker-preview">
          <img src={value} alt="preview" />
        </div>
      )}
    </div>
  );
}
