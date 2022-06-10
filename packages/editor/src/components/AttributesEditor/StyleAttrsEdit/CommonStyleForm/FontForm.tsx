import * as React from 'react';
import { TextStyle } from '@vize/types';
import { Radio, Slider } from 'antd';
import { ColorFormat, getSliderValue } from 'utils';
import { Color } from 'widgets/Form/Fields/Color';
import { Trans } from 'react-i18next';
import { StyleFormProps } from './types';

const { Group: RadioGroup } = Radio;

export function FontForm({ style, onChange }: StyleFormProps<TextStyle>) {
  const { color, fontSize, lineHeight, textAlign, weight } = style;

  return (
    <div className="common-text-style-form">
      <div className="editor-prop-form-item">
        <span>
          <Trans>Color</Trans>:
        </span>
        <Color value={color} onChange={color => onChange({ ...style, color })} format={ColorFormat.HEX} />
      </div>
      <div className="editor-prop-form-item">
        <span>
          <Trans>Align</Trans>:
        </span>
        <RadioGroup onChange={e => onChange({ ...style, textAlign: e.target.value })} value={textAlign}>
          <Radio value="left">
            <Trans>left</Trans>
          </Radio>
          <Radio value="center">
            <Trans>center</Trans>
          </Radio>
          <Radio value="right">
            <Trans>right</Trans>
          </Radio>
        </RadioGroup>
      </div>
      <div className="editor-prop-form-item">
        <span>
          <Trans>Font Weight</Trans>:
        </span>
        <RadioGroup onChange={e => onChange({ ...style, weight: e.target.value })} value={weight}>
          <Radio value="lighter">
            <Trans>lighter</Trans>
          </Radio>
          <Radio value="normal">
            <Trans>normal</Trans>
          </Radio>
          <Radio value="bolder">
            <Trans>bolder</Trans>
          </Radio>
        </RadioGroup>
      </div>
      <div className="editor-prop-form-item">
        <span>
          <Trans>Font size</Trans>: {fontSize}
        </span>
        <Slider
          min={1}
          max={64}
          value={fontSize}
          onChange={(v: number | [number, number]) => onChange({ ...style, fontSize: getSliderValue(v) })}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>
          <Trans>Line height</Trans>: {lineHeight}
        </span>
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
