import { Collapse } from 'antd';
import * as React from 'react';
import { CommonStyle } from 'types';
import PositionForm from './PositionForm';
import TransformForm from './TransformForm';
import FontForm from './FontForm';
import BackgroundForm from './BackgroundForm';
import { DistanceStyleForm } from './DistanceForm';
import BorderForm from './BorderForm';
import SizeForm from './SizeForm';
import ZindexForm from './ZindexForm';

export interface StyleFormProps<T> {
  style: T;
  onChange: (newStyle: T) => void;
  title?: string;
}

const { Panel } = Collapse;

function CommonStyleForm({ style, onChange }: StyleFormProps<CommonStyle>) {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['0', '1', '2', '3', '4', '5', '6', '7']}
      className="editor-prop-form common-style-form"
    >
      {(style.margin || style.padding) && (
        <Panel header="边距" key="0">
          <DistanceStyleForm
            style={{ margin: style.margin, padding: style.padding }}
            onChange={({ margin, padding }) => onChange({ ...style, margin, padding })}
          />
        </Panel>
      )}
      {style.position && (
        <Panel header="定位" key="1">
          <PositionForm
            style={style.position}
            onChange={newStyle => {
              onChange({
                ...style,
                position: newStyle,
              });
            }}
          />
        </Panel>
      )}
      {style.transform && (
        <Panel header="变形" key="2">
          <TransformForm style={style.transform} onChange={newStyle => onChange({ ...style, transform: newStyle })} />
        </Panel>
      )}
      {style.text && (
        <Panel header="字体" key="3">
          <FontForm style={style.text} onChange={(newStyle: any) => onChange({ ...style, text: newStyle })} />
        </Panel>
      )}
      {style.background && (
        <Panel header="背景" key="4">
          <BackgroundForm
            style={style.background}
            onChange={newStyle => onChange({ ...style, background: newStyle })}
          />
        </Panel>
      )}
      {style.border && (
        <Panel header="边框" key="5">
          <BorderForm style={style.border} onChange={(newStyle: any) => onChange({ ...style, border: newStyle })} />
        </Panel>
      )}
      {style.size && (
        <Panel header="尺寸" key="6">
          <SizeForm style={style.size} onChange={(newStyle: any) => onChange({ ...style, size: newStyle })} />
        </Panel>
      )}
      {style.zIndex && (
        <Panel header="层级" key="7" style={{ borderBottom: 'none' }}>
          <ZindexForm style={style.zIndex} onChange={newStyle => onChange({ ...style, zIndex: newStyle })} />
        </Panel>
      )}
    </Collapse>
  );
}
export default CommonStyleForm;
