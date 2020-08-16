import * as React from 'react';
import { SizeStyle } from 'types';
import { InputNumber, Switch } from 'antd';
import { StyleFormProps } from './index';

function SizeStyleForm({ style, onChange }: StyleFormProps<SizeStyle>) {
  const { autoWidth, autoHeight, width, height } = style;

  return (
    <div className="common-size-style-form">
      <div className="editor-prop-form-item">
        <span>默认宽度</span>
        <Switch checked={autoWidth} onChange={checked => onChange({ ...style, autoWidth: checked })} />
        <span>宽</span>
        <InputNumber
          min={1}
          disabled={autoWidth}
          value={width}
          onChange={width => onChange({ ...style, width: (width as number) || 1 })}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>默认高度</span>
        <Switch checked={autoHeight} onChange={checked => onChange({ ...style, autoHeight: checked })} />
        <span>高</span>
        <InputNumber
          min={1}
          disabled={autoHeight}
          value={height}
          onChange={height => onChange({ ...style, height: (height as number) || 1 })}
        />
      </div>
    </div>
  );
}

export default SizeStyleForm;
