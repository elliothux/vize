import * as React from 'react';
import { Collapse } from 'antd';
import { CommonStyle } from 'types';
import { useTranslation } from 'react-i18next';
import { PositionForm } from './PositionForm';
import { TransformForm } from './TransformForm';
import { FontForm } from './FontForm';
import { BackgroundForm } from './BackgroundForm';
import { DistanceStyleForm } from './DistanceForm';
import { BorderForm } from './BorderForm';
import { SizeForm } from './SizeForm';
import { ZIndexForm } from './ZIndexForm';
import { StyleFormProps } from './types';

const { Panel } = Collapse;

export function CommonStyleForm({ style, onChange }: StyleFormProps<CommonStyle>) {
  const { t } = useTranslation();
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['0', '1', '2', '3', '4', '5', '6', '7']}
      className="editor-prop-form common-style-form"
    >
      {(style.margin || style.padding) && (
        <Panel header={t('Margins')} key="0">
          <DistanceStyleForm
            style={{ margin: style.margin, padding: style.padding }}
            onChange={({ margin, padding }) => onChange({ ...style, margin, padding })}
          />
        </Panel>
      )}
      {style.position && (
        <Panel header={t('Position')} key="1">
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
        <Panel header={t('Transform')} key="2">
          <TransformForm style={style.transform} onChange={newStyle => onChange({ ...style, transform: newStyle })} />
        </Panel>
      )}
      {style.text && (
        <Panel header={t('Font')} key="3">
          <FontForm style={style.text} onChange={(newStyle: any) => onChange({ ...style, text: newStyle })} />
        </Panel>
      )}
      {style.background && (
        <Panel header={t('Background')} key="4">
          <BackgroundForm
            style={style.background}
            onChange={newStyle => onChange({ ...style, background: newStyle })}
          />
        </Panel>
      )}
      {style.border && (
        <Panel header={t('Border')} key="5">
          <BorderForm style={style.border} onChange={(newStyle: any) => onChange({ ...style, border: newStyle })} />
        </Panel>
      )}
      {style.size && (
        <Panel header={t('Size')} key="6">
          <SizeForm style={style.size} onChange={(newStyle: any) => onChange({ ...style, size: newStyle })} />
        </Panel>
      )}
      {style.zIndex && (
        <Panel header={t('Layer')} key="7" style={{ borderBottom: 'none' }}>
          <ZIndexForm style={style.zIndex} onChange={newStyle => onChange({ ...style, zIndex: newStyle })} />
        </Panel>
      )}
    </Collapse>
  );
}
