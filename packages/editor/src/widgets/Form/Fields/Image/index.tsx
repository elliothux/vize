import './index.scss';
import * as React from 'react';
import { Icon, Input } from 'antd';
import classnames from 'classnames';
import { events, EventEmitTypes } from 'pages/editor/utils';
import { FileType, SrcWithSize } from 'types';
import { isEmpty } from 'utils';
import { FormProps } from '../types';
import { ResourceManagerParams } from '../../components/StaticResourceManager';

export function Image({ onChange: iOnChange, value }: FormProps<string>) {
  const onChange = (value: SrcWithSize) => iOnChange(value[0]);

  const button = (
    <Icon
      type="cloud-upload"
      onClick={() =>
        events.emit(EventEmitTypes.MANAGE_RESOURCE, {
          type: FileType.IMAGE,
          multiple: false,
          onSelect: onChange,
          initValues: [value],
        } as ResourceManagerParams<SrcWithSize>)
      }
    />
  );

  return (
    <span className="ant-input-affix-wrapper">
      <div className={classnames('form-image-picker')}>
        <Input
          addonAfter={button}
          value={value}
          onChange={e => iOnChange(e.target.value || '')}
          allowClear
        />
        {!isEmpty(value) && (
          <div className="form-image-picker-preview" style={{ backgroundImage: `url(${value})` }} />
        )}
      </div>
    </span>
  );
}

export function ImageWithSizeInfo({ onChange, value: v }: FormProps<SrcWithSize>) {
  const value = v[0];
  const button = (
    <Icon
      type="cloud-upload"
      onClick={() =>
        events.emit(EventEmitTypes.MANAGE_RESOURCE, {
          type: FileType.IMAGE,
          multiple: false,
          onSelect: onChange,
          initValues: [value],
        } as ResourceManagerParams<SrcWithSize>)
      }
    />
  );

  return (
    <span className="ant-input-affix-wrapper">
      <div className={classnames('form-image-picker')}>
        <Input addonAfter={button} value={value} disabled allowClear={false} />
        {!isEmpty(value) && (
          <div className="form-image-picker-preview" style={{ backgroundImage: `url(${value})` }} />
        )}
      </div>
    </span>
  );
}
