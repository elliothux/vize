import * as React from 'react';
import { ZIndexStyle } from 'types';
import { InputNumber, Switch } from 'antd';
import { Trans } from 'react-i18next';
import { StyleFormProps } from './index';

export function ZIndexForm({ style: zIndex, onChange }: StyleFormProps<ZIndexStyle>) {
  const auto = typeof zIndex === 'boolean' && zIndex;

  return (
    <div className="common-zIndex-style-form">
      <div className="editor-prop-form-item">
        <span>
          <Trans>Default layer</Trans>
        </span>
        <Switch checked={auto} onChange={auto => onChange(auto ? true : 1)} />
        <span>
          <Trans>Layer</Trans>
        </span>
        <InputNumber
          disabled={auto}
          min={0}
          max={999}
          value={auto ? 1 : (zIndex as number)}
          onChange={v => onChange(v as number)}
        />
      </div>
    </div>
  );
}
