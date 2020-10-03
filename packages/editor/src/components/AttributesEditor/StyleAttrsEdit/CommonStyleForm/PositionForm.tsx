import './index.scss';
import * as React from 'react';
import { FixedOutset, IPositionStyle, PositionStyle } from 'types';
import { Radio } from 'antd';
import classnames from 'classnames';
import { StyleFormProps } from './index';
import OUTSET from 'static/images/outset.raw.svg';

export const defaultDistance = { top: 0, left: 0, bottom: 0, right: 0 };
const { Group: RadioGroup } = Radio;

function PositionForm({ style, onChange }: StyleFormProps<PositionStyle>) {
  const fixed = typeof style === 'object';
  const outset = fixed ? (style as IPositionStyle).outset : null;

  function onChangeOutset(outset: FixedOutset) {
    console.log(11111);
    onChange({ top: 0, left: 0, right: 0, bottom: 0, outset });
  }

  return (
    <div className="position-style-form">
      <div className="editor-prop-form-item">
        <span>定位:</span>
        <RadioGroup
          onChange={({ target: { value } }) => {
            onChange(value === 'static' ? true : { ...defaultDistance, outset: FixedOutset.BottomLeft });
          }}
          value={fixed ? 'fixed' : 'static'}
        >
          <Radio value="static">默认</Radio>
          <Radio value="fixed">固定</Radio>
        </RadioGroup>
      </div>
      {fixed && (
        <div className="fixed-outset">
          <div
            onClick={() => onChangeOutset(FixedOutset.TopLeft)}
            className={classnames('top left', { activated: outset === FixedOutset.TopLeft })}
            dangerouslySetInnerHTML={{ __html: OUTSET }}
          ></div>
          <div
            onClick={() => onChangeOutset(FixedOutset.TopRight)}
            className={classnames('top right', {
              activated: outset === FixedOutset.TopRight,
            })}
            dangerouslySetInnerHTML={{ __html: OUTSET }}
          ></div>
          <div
            onClick={() => onChangeOutset(FixedOutset.BottomRight)}
            className={classnames('bottom right', {
              activated: outset === FixedOutset.BottomRight,
            })}
            dangerouslySetInnerHTML={{ __html: OUTSET }}
          ></div>
          <div
            onClick={() => onChangeOutset(FixedOutset.BottomLeft)}
            className={classnames('bottom left', {
              activated: outset === FixedOutset.BottomLeft,
            })}
            dangerouslySetInnerHTML={{ __html: OUTSET }}
          ></div>
          <span>定位点</span>
        </div>
      )}
    </div>
  );
}
export default PositionForm;
