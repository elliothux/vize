import * as React from 'react';
import { BackgroundStyle } from 'types';
import { Radio, Select } from 'antd';
import { isEmpty, ColorFormat } from 'utils';
import { Color } from 'widgets/Form/Fields/Color';
import { Trans } from 'react-i18next';
import { StyleFormProps } from './index';

const { Option } = Select;
const { Group: RadioGroup } = Radio;

export function BackgroundForm({ style, onChange }: StyleFormProps<BackgroundStyle>) {
  const { color, image, size, position, repeat } = style;

  return (
    <div className="common-background-style-form">
      <div className="editor-prop-form-item">
        <span>
          <Trans>Color</Trans>:
        </span>
        <Color
          // disabled={colorDisabled}
          value={color}
          onChange={color => onChange({ ...style, color })}
          format={ColorFormat.RGBA}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>
          <Trans>Picture</Trans>:
        </span>
        {/* <Image value={image} onChange={image => onChange({ ...style, image })} /> */}
      </div>
      {isEmpty(image) ? null : (
        <>
          <div className="editor-prop-form-item">
            <span>
              <Trans>Position of picture</Trans>:
            </span>
            <RadioGroup onChange={e => onChange({ ...style, position: e.target.value })} value={position}>
              <Radio value="left top">
                <Trans>left</Trans>
              </Radio>
              <Radio value="center top">
                <Trans>center</Trans>
              </Radio>
              <Radio value="right top">
                <Trans>right</Trans>
              </Radio>
            </RadioGroup>
          </div>
          <div className="editor-prop-form-item">
            <span>
              <Trans>Adaptation of picture</Trans>:
            </span>
            <Select
              defaultValue="auto"
              value={size}
              onChange={(size: string) => onChange({ ...style, size })}
              style={{ width: 172 }}
            >
              <Option value="auto">
                <Trans>Original size</Trans>
              </Option>
              <Option value="100% auto">
                <Trans>Stretch width, adapt height</Trans>
              </Option>
              <Option value="auto 100%">
                <Trans>Stretch height, adapt width</Trans>
              </Option>
              <Option value="100% 100%">
                <Trans>Stretch width & height</Trans>
              </Option>
            </Select>
          </div>
          <div className="editor-prop-form-item">
            <span>
              <Trans>Tiling of picture</Trans>:
            </span>
            <Select
              defaultValue="repeat-y"
              value={repeat}
              onChange={(repeat: string) => onChange({ ...style, repeat })}
              style={{ width: 172 }}
            >
              <Option value="no-repeat">
                <Trans>Not tile</Trans>
              </Option>
              <Option value="repeat-x">
                <Trans>Tile horizontally</Trans>
              </Option>
              <Option value="repeat-y">
                <Trans>Tile vertically</Trans>
              </Option>
              <Option value="repeat">
                <Trans>Tile horizontally & vertically</Trans>
              </Option>
            </Select>
          </div>
        </>
      )}
    </div>
  );
}
