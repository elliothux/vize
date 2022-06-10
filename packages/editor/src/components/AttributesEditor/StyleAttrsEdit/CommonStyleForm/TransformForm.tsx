import * as React from 'react';
import { TransformStyle } from '@vize/types';
import { Slider } from 'antd';
import { getSliderValue } from 'utils';
import { Trans } from 'react-i18next';
import { StyleFormProps } from './types';

export function TransformForm({ style, onChange }: StyleFormProps<TransformStyle>) {
  const { rotate, scale, radius, opacity } = style;
  return (
    <div className="transform-style-item">
      <div className="editor-prop-form-item">
        <span>
          <Trans>Opacity</Trans>: {opacity}
        </span>
        <Slider
          min={0}
          max={1}
          value={opacity}
          step={0.1}
          onChange={(v: number | [number, number]) => onChange({ ...style, opacity: getSliderValue(v) })}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>
          <Trans>Rotate</Trans>: {rotate}
        </span>
        <Slider
          min={-180}
          max={180}
          value={rotate}
          step={1}
          onChange={(v: number | [number, number]) => onChange({ ...style, rotate: getSliderValue(v) })}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>
          <Trans>Scale</Trans>: {scale}
        </span>
        <Slider
          min={0.1}
          max={10}
          value={scale}
          step={0.1}
          onChange={(v: number | [number, number]) => onChange({ ...style, scale: getSliderValue(v) })}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>
          <Trans>Border radius</Trans>: {radius}
        </span>
        <Slider
          min={0}
          max={100}
          value={radius}
          step={1}
          onChange={(v: number | [number, number]) => onChange({ ...style, radius: getSliderValue(v) })}
        />
      </div>
    </div>
  );
}
