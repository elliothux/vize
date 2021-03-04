import './index.scss';
import * as React from 'react';
import { useMemo } from 'react';
import { SketchPicker } from 'react-color';
import { Popover } from 'antd';
import classnames from 'classnames';
import { ColorFormat, isAlphaSupported, parseColor, stringifyColor } from 'utils';
import { i18n } from 'i18n';
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

function Color(props: Props) {
  const disabled = useMemo(() => (typeof props.disabled === 'boolean' ? props.disabled : false), [props.disabled]);
  const [format, supportAlpha] = useMemo(() => {
    const format = props.format ? (props.format.toLowerCase() as ColorFormat) : ColorFormat.HEX;
    return [format, isAlphaSupported(format)];
  }, [props.format]);

  return (
    <div className={classnames('form-color-picker', { disabled })}>
      <div className="form-color-picker-mask" />
      <Popover
        title={i18n.t('Choose color')}
        trigger="click"
        content={
          <SketchPicker
            disableAlpha={!supportAlpha}
            color={parseColor(props.value)}
            onChangeComplete={color => props.onChange(stringifyColor(color.rgb, format))}
            width="256px"
          />
        }
        overlayClassName="form-color-picker-popover"
        arrowPointAtCenter
      >
        <div className="form-color-picker-color" style={{ backgroundColor: props.value }} />
      </Popover>
      <div className="form-color-picker-commons">
        {commonColors.map(i => (
          <div key={i} style={{ backgroundColor: i }} onClick={() => props.onChange(stringifyColor(i, format))} />
        ))}
      </div>
    </div>
  );
}

export { Color };
