import * as React from 'react';
import { TransformStyle } from 'types';
import { Slider } from 'antd';
import { getSliderValue } from 'utils';
import { StyleFormProps } from './index';

function TransformForm({ style, onChange }: StyleFormProps<TransformStyle>) {
  const { rotate, scale, radius, opacity } = style;
  console.log(style, 'transform');
  return (
    <div className="transform-style-item">
      <div className="editor-prop-form-item">
        <span>透明: {opacity}</span>
        <Slider
          min={0}
          max={1}
          value={opacity}
          step={0.1}
          onChange={(v: number | [number, number]) => onChange({ ...style, opacity: getSliderValue(v) })}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>旋转: {rotate}</span>
        <Slider
          min={-180}
          max={180}
          value={rotate}
          step={1}
          onChange={(v: number | [number, number]) => onChange({ ...style, rotate: getSliderValue(v) })}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>缩放: {scale}</span>
        <Slider
          min={0.1}
          max={10}
          value={scale}
          step={0.1}
          onChange={(v: number | [number, number]) => onChange({ ...style, scale: getSliderValue(v) })}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>圆角: {radius}</span>
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

export default TransformForm;
