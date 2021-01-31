import './index.scss';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { PageHeader, Drawer, Tabs, Modal } from 'antd';
import { LayoutMode, Maybe, PageMode } from 'types';
import { createPage } from 'api';
import { CreateSteps } from './CreateSteps';
import { PageModeSelector } from './PageModeSelector';
import { LayoutModeSelector } from './LayoutModeSelector';
import { PageDetail } from './types';
import { PageDetailForm } from './PageDetailForm';
import { CreateResult } from './CreateResult';

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
  isTemplate: boolean;
}

const { TabPane } = Tabs;

const TOGGLE_DELAY = 500;

export function CreatePage({ visible, setVisible, isTemplate }: Props) {
  const [step, setStep] = useState(0);
  const [showErr, setShowErr] = useState(false);
  const [pageMode, setPageMode] = useState<Maybe<PageMode>>(null);
  const [layoutMode, setLayoutMode] = useState<Maybe<LayoutMode>>(null);
  const [pageDetail, setPageDetail] = useState<Partial<PageDetail>>({ generator: 'web' });
  const [pageID, setPageID] = useState<Maybe<number>>(null);

  const onBack = useCallback(() => setVisible(false), []);

  const onSetPageMode = useCallback((mode: Maybe<PageMode>) => {
    setPageMode(mode);
    setTimeout(() => setStep(1), TOGGLE_DELAY);
  }, []);

  const onSetLayoutMode = useCallback((mode: Maybe<LayoutMode>) => {
    setLayoutMode(mode);
    setTimeout(() => setStep(2), TOGGLE_DELAY);
  }, []);

  const onSetPageDetail = useCallback(
    async (detail: Partial<PageDetail>) => {
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

      const [success, result, { message, code }] = await createPage({
        ...(detail as Required<PageDetail>),
        author: 'qy',
        pageMode,
        layoutMode,
        isTemplate: isTemplate ? 1 : 0,
      });

      if (success) {
        setPageID(result!.id);
      } else {
        const content = `错误码: ${code}$\n错误信息: ${message}`;
        Modal.error({ title: '创建失败', content, onOk: () => setStep(2) });
      }
    },
    [pageMode, layoutMode, isTemplate],
  );

  const title = `创建${isTemplate ? '模板' : '页面'}`;

  return (
    <Drawer
      className="create-page"
      title=""
      closable
      onClose={onBack}
      visible={visible}
      placement="bottom"
      headerStyle={{ display: 'none' }}
    >
      <PageHeader onBack={onBack} title={title} subTitle="" />

      <CreateSteps
        current={step}
        setCurrent={setStep}
        showErr={showErr}
        step1Finish={!!pageMode}
        step2Finish={!!layoutMode}
        step3Finish={Object.keys(pageDetail).length > 1}
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
          <CreateResult pageID={pageID} onClose={onBack} />
        </TabPane>
      </Tabs>
    </Drawer>
  );
}
