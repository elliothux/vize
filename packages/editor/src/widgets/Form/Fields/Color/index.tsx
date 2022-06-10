import './index.scss';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { Popover } from 'antd';
import classnames from 'classnames';
import { ColorFormat, isAlphaSupported, parseColor, stringifyColor } from 'utils';
import { i18n } from '@vize/i18n';
import { FormProps } from '../../types';

const commonColors = [
  '#FFFFFF',
  '#FF524B',
  '#F5A55C',
  '#FFC946',
  '#00CFA4',
  '#4EC7F6',
  '#4490EE',
  '#6D71E9',
  '#4E5873',
  '#000000',
];

interface Props extends FormProps<string> {
  disabled?: boolean;
  format?: ColorFormat;
}

function Color({ disabled: fieldDisabled, format: fieldFormat, value, onChange }: Props) {
  const disabled = useMemo(() => (typeof fieldDisabled === 'boolean' ? fieldDisabled : false), [fieldDisabled]);
  // TODO
  const [format, supportAlpha] = useMemo(() => {
    const format = fieldFormat ? (fieldFormat.toLowerCase() as ColorFormat) : ColorFormat.HEX;
    return [format, isAlphaSupported(format)];
  }, [fieldFormat]);
  const color = useMemo(() => parseColor(value), [value]);
  const onChangeComplete = useCallback((color: ColorResult) => onChange(stringifyColor(color.rgb, format)), [onChange]);

  return (
    <div className={classnames('form-color-picker', { disabled })}>
      <div className="form-color-picker-mask" />
      <Popover
        title={i18n.t('Choose color')}
        trigger="click"
        content={<SketchPicker disableAlpha={false} color={color} onChangeComplete={onChangeComplete} width="256px" />}
        overlayClassName="form-color-picker-popover"
        arrowPointAtCenter
      >
        <div className="form-color-picker-color" style={{ backgroundColor: value }} />
      </Popover>
      <div className="form-color-picker-commons">
        {commonColors.map(i => (
          <div key={i} style={{ backgroundColor: i }} onClick={() => onChange(stringifyColor(i, format))} />
        ))}
      </div>
    </div>
  );
}

export { Color };
