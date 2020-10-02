import './index.scss';
import * as React from 'react';
import { StyleFormProps } from '../index';
import { MarginAndPaddingStyle, DistanceStyleWithAuto, DistanceStyle } from 'types';
import { defaultDistance } from '../PositionForm';
import { MarginPaddingField } from './types';
import { BoxEditor } from './BoxEdit';

export function DistanceForm({ style, onChange }: StyleFormProps<MarginAndPaddingStyle>) {
  const margin = style.margin || defaultDistance;
  const padding = style.padding || defaultDistance;

  return (
    <div className="distance-style-form">
      <BoxEditor
        size={300}
        marginTop={margin.top}
        marginBottom={margin.bottom}
        marginLeft={margin.left}
        marginRight={margin.right}
        paddingTop={padding.top}
        paddingBottom={padding.bottom}
        paddingLeft={padding.left}
        paddingRight={padding.right}
        onChange={(field, value) => {
          let margin = style.margin as DistanceStyleWithAuto;
          let padding = style.padding as DistanceStyle;

          switch (field) {
            case MarginPaddingField.MarginLeft: {
              margin = { ...margin, left: value };
              if (value === 'auto') {
                margin.right = 'auto';
              } else if (margin.right === 'auto') {
                margin.right = 0;
              }
              break;
            }
            case MarginPaddingField.MarginRight: {
              margin = { ...margin, right: value };
              if (value === 'auto') {
                margin.left = 'auto';
              } else if (margin.left === 'auto') {
                margin.left = 0;
              }
              break;
            }
            case MarginPaddingField.MarginTop:
              margin = { ...margin, top: value as number };
              break;
            case MarginPaddingField.MarginBottom:
              margin = { ...margin, bottom: value as number };
              break;

            case MarginPaddingField.PaddingLeft:
              padding = { ...padding, left: value as number };
              break;
            case MarginPaddingField.PaddingRight:
              padding = { ...padding, right: value as number };
              break;
            case MarginPaddingField.PaddingTop:
              padding = { ...padding, top: value as number };
              break;
            case MarginPaddingField.PaddingBottom:
              padding = { ...padding, bottom: value as number };
              break;
          }

          onChange({ margin, padding });
        }}
      />
    </div>
  );
}
