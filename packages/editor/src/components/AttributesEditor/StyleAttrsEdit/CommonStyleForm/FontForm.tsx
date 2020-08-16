import * as React from 'react';
import { TextStyle } from 'types';
import { Radio, Slider } from 'antd';
import { ColorFormat, getSliderValue } from 'utils';
import { StyleFormProps } from './index';
import { Color } from '../../../Form/Color';

const { Group: RadioGroup } = Radio;

function TextStyleForm({ style, onChange }: StyleFormProps<TextStyle>) {
  const { color, fontSize, lineHeight, textAlign, weight } = style;

  return (
    <div className="common-text-style-form">
      <div className="editor-prop-form-item">
        <span>颜色:</span>
        <Color value={color} onChange={color => onChange({ ...style, color })} format={ColorFormat.HEX} />
      </div>
      <div className="editor-prop-form-item">
        <span>对齐:</span>
        <RadioGroup onChange={e => onChange({ ...style, textAlign: e.target.value })} value={textAlign}>
          <Radio value="left">左</Radio>
          <Radio value="center">居中</Radio>
          <Radio value="right">右</Radio>
        </RadioGroup>
      </div>
      <div className="editor-prop-form-item">
        <span>粗细:</span>
        <RadioGroup onChange={e => onChange({ ...style, weight: e.target.value })} value={weight}>
          <Radio value="lighter">细</Radio>
          <Radio value="normal">正常</Radio>
          <Radio value="bolder">粗</Radio>
        </RadioGroup>
      </div>
      <div className="editor-prop-form-item">
        <span>大小: {fontSize}</span>
        <Slider
          min={1}
          max={64}
          value={fontSize}
          onChange={(v: number | [number, number]) => onChange({ ...style, fontSize: getSliderValue(v) })}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>行高: {lineHeight}</span>
        <Slider
          min={1}
          max={128}
          value={lineHeight}
          onChange={(v: number | [number, number]) => onChange({ ...style, lineHeight: getSliderValue(v) })}
        />
      </div>
    </div>
  );
}

export default TextStyleForm;
