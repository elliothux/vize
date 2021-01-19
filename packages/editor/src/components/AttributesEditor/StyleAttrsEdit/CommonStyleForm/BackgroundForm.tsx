import * as React from 'react';
import { BackgroundStyle } from 'types';
import { Radio, Select } from 'antd';
import { isEmpty, ColorFormat } from 'utils';
import { Color } from 'widgets/Form/Fields/Color';
import { StyleFormProps } from './index';

const { Option } = Select;
const { Group: RadioGroup } = Radio;

function BackgroundStyleForm({ style, onChange }: StyleFormProps<BackgroundStyle>) {
  const { color, image, size, position, repeat } = style;

  return (
    <div className="common-background-style-form">
      <div className="editor-prop-form-item">
        <span>颜色:</span>
        <Color
          // disabled={colorDisabled}
          value={color}
          onChange={color => onChange({ ...style, color })}
          format={ColorFormat.RGBA}
        />
      </div>
      <div className="editor-prop-form-item">
        <span>图片: </span>
        {/* <Image value={image} onChange={image => onChange({ ...style, image })} /> */}
      </div>
      {isEmpty(image) ? null : (
        <>
          <div className="editor-prop-form-item">
            <span>图片位置: </span>
            <RadioGroup onChange={e => onChange({ ...style, position: e.target.value })} value={position}>
              <Radio value="left top">左</Radio>
              <Radio value="center top">居中</Radio>
              <Radio value="right top">右</Radio>
            </RadioGroup>
          </div>
          <div className="editor-prop-form-item">
            <span>图片自适应方式: </span>
            <Select
              defaultValue="auto"
              value={size}
              onChange={(size: string) => onChange({ ...style, size })}
              style={{ width: 172 }}
            >
              <Option value="auto">原图尺寸</Option>
              <Option value="100% auto">宽度拉伸，高度自适应</Option>
              <Option value="auto 100%">高度拉伸，宽度自适应</Option>
              <Option value="100% 100%">宽度高度均拉伸</Option>
            </Select>
          </div>
          <div className="editor-prop-form-item">
            <span>图片平铺方式: </span>
            <Select
              defaultValue="repeat-y"
              value={repeat}
              onChange={(repeat: string) => onChange({ ...style, repeat })}
              style={{ width: 172 }}
            >
              <Option value="no-repeat">不平铺</Option>
              <Option value="repeat-x">水平平铺</Option>
              <Option value="repeat-y">垂直平铺</Option>
              <Option value="repeat">水平垂直平铺</Option>
            </Select>
          </div>
        </>
      )}
    </div>
  );
}

export default BackgroundStyleForm;
