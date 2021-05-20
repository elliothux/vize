import './index.scss';
import 'antd-mobile/es/accordion/style/index.css';
import * as React from 'react';
import { ComponentProps } from '@vize/types';
import { default as AccordionComponent } from 'antd-mobile/es/accordion';

interface Data {
  title: string;
  defaultExpand: boolean;
}

export default function Accordion({ data: { defaultExpand, title }, commonStyle, children }: ComponentProps<Data>) {
  return (
    <AccordionComponent
      className="vize-materials-universal-accordion"
      style={commonStyle}
      defaultActiveKey={defaultExpand ? 'default' : ''}
    >
      <AccordionComponent.Panel key="default" header={title}>
        {children}
      </AccordionComponent.Panel>
    </AccordionComponent>
  );
}
