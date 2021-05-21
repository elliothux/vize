import './index.scss';
import 'antd-mobile/es/accordion/style/index';
import * as React from 'react';
import { ComponentProps } from '@vize/types';
import { default as AccordionComponent } from 'antd-mobile/es/accordion';
import { useCallback, useEffect, useState } from 'react';

interface Data {
  title: string;
  defaultExpand: boolean;
}

export default function Accordion({ data: { defaultExpand, title }, commonStyle, children, on }: ComponentProps<Data>) {
  const [activeKey, setActiveKey] = useState(defaultExpand ? 'default' : undefined);

  useEffect(() => {
    setActiveKey(defaultExpand ? 'default' : undefined);
  }, [defaultExpand]);

  useEffect(() => {
    on('open', () => setActiveKey('default'));
    on('close', () => setActiveKey(undefined));
    on('toggle', () => setActiveKey(i => (i === 'default' ? undefined : 'default')));
  }, []);

  const onChange = useCallback(([key]: string[]) => setActiveKey(key), []);

  return (
    <AccordionComponent
      className="vize-materials-universal-accordion"
      style={commonStyle}
      activeKey={activeKey}
      onChange={onChange}
    >
      <AccordionComponent.Panel key="default" header={title}>
        {children}
      </AccordionComponent.Panel>
    </AccordionComponent>
  );
}
