import './index.scss';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { PageHeader, Drawer, Tabs } from 'antd';
import { useLocation } from 'wouter';
import { RouterPaths } from 'router';
import { LayoutMode, Maybe, PageMode } from 'types';
import { CreateSteps } from './CreateSteps';
import { PageModeSelector } from './PageModeSelector';
import { LayoutModeSelector } from './LayoutModeSelector';
import { PageDetail } from './types';
import { PageDetailForm } from './PageDetailForm';
import { CreateResult } from './CreateResult';

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

const { TabPane } = Tabs;

const TOGGLE_DELAY = 500;

export function CreatePage({ visible, setVisible }: Props) {
  const [, navigateTo] = useLocation();

  const [step, setStep] = useState(0);
  const [showErr, setShowErr] = useState(false);
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

  const onSetPageDetail = useCallback(
    (detail: Partial<PageDetail>) => {
      console.log(detail);
      setPageDetail(detail);

      if (!pageMode) {
        setStep(0);
        setShowErr(true);
        return;
      }

      if (!layoutMode) {
        setStep(1);
        setShowErr(true);
        return;
      }

      setStep(3);
    },
    [pageMode, layoutMode],
  );

  return (
    <Drawer
      className="create-page"
      title="创建页面"
      closable
      onClose={() => setVisible(false)}
      visible={visible}
      placement="bottom"
      headerStyle={{ display: 'none' }}
    >
      <PageHeader onBack={onBack} title="创建页面" subTitle="" />

      <CreateSteps
        current={step}
        setCurrent={setStep}
        showErr={showErr}
        step1Finish={!!pageMode}
        step2Finish={!!layoutMode}
        step3Finish={Object.keys(pageDetail).length > 0}
      />

      <Tabs activeKey={step.toString()} renderTabBar={() => <span />} tabPosition="top" animated>
        <TabPane tab={0} key={0}>
          <PageModeSelector current={pageMode} setCurrent={onSetPageMode} showErr={showErr} />
        </TabPane>
        <TabPane tab={1} key={1}>
          <LayoutModeSelector current={layoutMode} setCurrent={onSetLayoutMode} showErr={showErr} />
        </TabPane>
        <TabPane tab={2} key={2} forceRender>
          <PageDetailForm current={pageDetail} setCurrent={onSetPageDetail} />
        </TabPane>
        <TabPane tab={3} key={3}>
          <CreateResult />
        </TabPane>
      </Tabs>
    </Drawer>
  );
}
