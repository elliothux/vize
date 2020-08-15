import { Collapse } from 'antd';
import * as React from 'react';
import { CommonStyle } from 'types';
import PositionForm from './PositionForm';

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
      className="editor-attr-form common-style-form"
    >
      {style.position && (
        <Panel header="定位" key="1">
          <PositionForm
            style={style.position}
            onChange={newStyle =>
              onChange({
                ...style,
                position: newStyle,
              })
            }
          />
        </Panel>
      )}
    </Collapse>
  );
}
export default CommonStyleForm;
