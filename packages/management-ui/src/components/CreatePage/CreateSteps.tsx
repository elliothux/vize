import * as React from 'react';
import { Steps } from 'antd';
import { ItemProps } from './types';

const { Step } = Steps;

export function CreateSteps({ current, setCurrent }: ItemProps<number>) {
  return (
    <Steps type="navigation" size="small" current={current} onChange={setCurrent}>
      <Step title="选择页面模式" subTitle="Step 1" status="process" description="单页或多页模式" />
      <Step title="选择布局模式" subTitle="Step 2" status="process" description="流式或自由布局" />
      <Step title="完善页面详情" subTitle="Step 3" status="process" description="业务、标题等详细信息" />
      <Step title="完成页面创建" subTitle="Step 4" status="process" description="完成页面创建" />
    </Steps>
  );
}
