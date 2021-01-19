import * as React from 'react';
import { BorderStyle } from 'types';
import { Radio, Slider } from 'antd';
import { ColorFormat, getSliderValue } from 'utils';
import { StyleFormProps } from './index';
import { Color } from 'widgets/Form/Fields/Color';

const { Group: RadioGroup } = Radio;

function BorderStyleForm({ style, onChange }: StyleFormProps<BorderStyle>) {
  const { type, color, width } = style;
  const disabled = type === 'none';

  return (
    <div className="common-border-style-form">
      <div className="editor-prop-form-item">
        <span>类型:</span>
        <RadioGroup onChange={e => onChange({ ...style, type: e.target.value })} value={type}>
          <Radio value="none">无</Radio>
          <Radio value="solid">实线</Radio>
          <Radio value="dashed">虚线</Radio>
        </RadioGroup>
      </div>
      <div className="editor-prop-form-item">
        <span>颜色:</span>
        <Color
          disabled={disabled}
          value={color}
          onChange={color => onChange({ ...style, color })}
          format={ColorFormat.HEX}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>宽: {width}</span>
        <Slider
          disabled={disabled}
          min={0}
          max={20}
          value={width}
          onChange={(v: number | [number, number]) => onChange({ ...style, width: getSliderValue(v) })}
        />
      </div>
    </div>
  );
}

export default BorderStyleForm;
