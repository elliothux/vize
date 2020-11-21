import * as React from 'react';
import { Steps } from 'antd';
import { ItemProps } from './types';

const { Step } = Steps;

interface Props extends ItemProps<number> {
  step1Finish?: boolean;
  step2Finish?: boolean;
  step3Finish?: boolean;
  step4Finish?: boolean;
}

export function CreateSteps({
  current,
  setCurrent,
  showErr,
  step1Finish,
  step2Finish,
  step3Finish,
  step4Finish,
}: Props) {
  return (
    <Steps type="navigation" size="small" current={current} onChange={setCurrent}>
      <Step
        title="选择页面模式"
        subTitle="Step 1"
        status={step1Finish ? 'finish' : showErr ? 'error' : 'process'}
        description="单页或多页模式"
        disabled={current === 3}
      />
      <Step
        title="选择布局模式"
        subTitle="Step 2"
        status={step2Finish ? 'finish' : showErr ? 'error' : 'process'}
        description="流式或自由布局"
        disabled={current === 3}
      />
      <Step
        title="完善页面详情"
        subTitle="Step 3"
        status={step3Finish ? 'finish' : showErr ? 'error' : 'process'}
        description="业务、标题等详细信息"
        disabled={current === 3}
      />
      <Step
        title="完成页面创建"
        subTitle="Step 4"
        status={step4Finish ? 'finish' : 'process'}
        description="完成页面创建"
        disabled={current !== 3}
      />
    </Steps>
  );
}
