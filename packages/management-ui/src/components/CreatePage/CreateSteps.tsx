import * as React from 'react';
import { Steps } from 'antd';
import { ItemProps } from './types';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <Steps type="navigation" size="small" current={current} onChange={setCurrent}>
      <Step
        title={t('Select Page Mode')}
        subTitle="Step 1"
        status={step1Finish ? 'finish' : showErr ? 'error' : 'process'}
        description={t('Single or Multi mode')}
        disabled={current === 3}
      />
      <Step
        title={t('Select Layout Mode')}
        subTitle="Step 2"
        status={step2Finish ? 'finish' : showErr ? 'error' : 'process'}
        description={t('Stream or Free layout')}
        disabled={current === 3}
      />
      <Step
        title={t('Complete Details')}
        subTitle="Step 3"
        status={step3Finish ? 'finish' : showErr ? 'error' : 'process'}
        description={t('Some detail infos')}
        disabled={current === 3}
      />
      <Step
        title={t('Complete')}
        subTitle="Step 4"
        status={step4Finish ? 'finish' : 'process'}
        description={t('Complete Details')}
        disabled={current !== 3}
      />
    </Steps>
  );
}
