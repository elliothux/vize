import './index.scss';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { PageHeader, Drawer } from 'antd';
import { useLocation } from 'wouter';
import { RouterPaths } from 'router';
import { LayoutMode, Maybe, PageMode } from 'types';
import { CreateSteps } from './CreateSteps';
import { PageModeSelector } from './PageModeSelector';
import { LayoutModeSelector } from './LayoutModeSelector';
import { PageDetail } from './types';
import { PageDetailForm } from './PageDetailForm';

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

const TOGGLE_DELAY = 500;

export function CreatePage({ visible, setVisible }: Props) {
  const [, navigateTo] = useLocation();

  const [step, setStep] = useState(2);
  const [pageMode, setPageMode] = useState<Maybe<PageMode>>(null);
  const [layoutMode, setLayoutMode] = useState<Maybe<LayoutMode>>(null);
  const [pageDetail, setPageDetail] = useState<Partial<PageDetail>>({});

  const onBack = useCallback(() => navigateTo(RouterPaths.PAGES), [navigateTo]);

  const onSetPageMode = useCallback((mode: Maybe<PageMode>) => {
    setPageMode(mode);
    setTimeout(() => setStep(1), TOGGLE_DELAY);
  }, []);

  const onSetLayoutMode = useCallback((mode: Maybe<LayoutMode>) => {
    setLayoutMode(mode);
    setTimeout(() => setStep(2), TOGGLE_DELAY);
  }, []);

  return (
    <Drawer
      className="create-page"
      title="创建页面"
      closable={true}
      onClose={() => setVisible(false)}
      visible={visible}
      placement="bottom"
      headerStyle={{ display: 'none' }}
    >
      <PageHeader onBack={onBack} title="创建页面" subTitle="" />
      <CreateSteps current={step} setCurrent={setStep} />

      {step === 0 && <PageModeSelector current={pageMode} setCurrent={onSetPageMode} />}
      {step === 1 && <LayoutModeSelector current={layoutMode} setCurrent={onSetLayoutMode} />}
      {step === 2 && <PageDetailForm current={pageDetail} setCurrent={setPageDetail} />}
    </Drawer>
  );
}
