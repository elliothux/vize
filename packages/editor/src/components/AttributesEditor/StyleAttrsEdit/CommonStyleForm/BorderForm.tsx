import * as React from 'react';
import { BorderStyle } from '@vize/types';
import { Radio, Slider } from 'antd';
import { ColorFormat, getSliderValue } from 'utils';
import { Color } from 'widgets/Form/Fields/Color';
import { Trans } from 'react-i18next';
import { StyleFormProps } from './types';

const { Group: RadioGroup } = Radio;

export function BorderForm({ style, onChange }: StyleFormProps<BorderStyle>) {
  const { type, color, width } = style;
  const disabled = type === 'none';

  return (
    <div className="common-border-style-form">
      <div className="editor-prop-form-item">
        <span>
          <Trans>Type</Trans>:
        </span>
        <RadioGroup onChange={e => onChange({ ...style, type: e.target.value })} value={type}>
          <Radio value="none">
            <Trans>none</Trans>
          </Radio>
          <Radio value="solid">
            <Trans>solid</Trans>
          </Radio>
          <Radio value="dashed">
            <Trans>dashed</Trans>
          </Radio>
        </RadioGroup>
      </div>
      <div className="editor-prop-form-item">
        <span>
          <Trans>Color</Trans>:
        </span>
        <Color
          disabled={disabled}
          value={color}
          onChange={color => onChange({ ...style, color })}
          format={ColorFormat.HEX}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>
          <Trans>Width</Trans>: {width}
        </span>
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
