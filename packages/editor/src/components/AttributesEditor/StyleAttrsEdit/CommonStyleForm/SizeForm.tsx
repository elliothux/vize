import * as React from 'react';
import { SizeStyle } from 'types';
import { InputNumber, Switch } from 'antd';
import { Trans } from 'react-i18next';
import { StyleFormProps } from './index';

export function SizeForm({ style, onChange }: StyleFormProps<SizeStyle>) {
  const { autoWidth, autoHeight, width, height } = style;

  return (
    <div className="common-size-style-form">
      <div className="editor-prop-form-item">
        <span>
          <Trans>default width</Trans>
        </span>
        <Switch checked={autoWidth} onChange={checked => onChange({ ...style, autoWidth: checked })} />
        <span>
          <Trans>width</Trans>
        </span>
        <InputNumber
          min={1}
          disabled={autoWidth}
          value={width}
          onChange={width => onChange({ ...style, width: (width as number) || 1 })}
        />
      </div>

      <div className="editor-prop-form-item">
        <span>
          <Trans>default height</Trans>
        </span>
        <Switch checked={autoHeight} onChange={checked => onChange({ ...style, autoHeight: checked })} />
        <span>
          <Trans>height</Trans>
        </span>
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
