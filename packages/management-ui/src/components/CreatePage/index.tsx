import './index.scss';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { PageHeader, Drawer, Tabs, Modal } from 'antd';
import { LayoutMode, Maybe, PageMode, PageRecord } from 'types';
import { createPage } from 'api';
import { CreateSteps } from './CreateSteps';
import { PageModeSelector } from './PageModeSelector';
import { LayoutModeSelector } from './LayoutModeSelector';
import { PageDetail } from './types';
import { PageDetailForm } from './PageDetailForm';
import { CreateResult } from './CreateResult';
import { useTranslation } from 'react-i18next';

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
  isTemplate: boolean;
}

const { TabPane } = Tabs;

const TOGGLE_DELAY = 500;

export function CreatePage({ visible, setVisible, isTemplate }: Props) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [showErr, setShowErr] = useState(false);
  const [pageMode, setPageMode] = useState<Maybe<PageMode>>(null);
  const [layoutMode, setLayoutMode] = useState<Maybe<LayoutMode>>(null);
  const [pageDetail, setPageDetail] = useState<Partial<PageDetail>>({ generator: 'web' });
  const [pageRecord, setPageRecord] = useState<Maybe<PageRecord>>(null);

  const onBack = useCallback(() => setVisible(false), []);

  const onClear = useCallback(() => {
    onBack();
    setTimeout(() => {
      setStep(0);
      setShowErr(false);
      setPageMode(null);
      setLayoutMode(null);
      setPageDetail({ generator: 'web' });
      setPageRecord(null);
    }, 1000);
  }, []);

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
        pageMode,
        layoutMode,
        isTemplate: isTemplate ? 1 : 0,
      });

      if (success && result) {
        setPageRecord(result);
      } else {
        const content = `Error Code: ${code}$\nInfo: ${message}`;
        Modal.error({ title: t('Failed to create'), content, onOk: () => setStep(2) });
      }
    },
    [pageMode, layoutMode, isTemplate],
  );

  const title = t(isTemplate ? 'Create Template' : 'Create Page');

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
          <CreateResult pageRecord={pageRecord} onClose={onClear} />
        </TabPane>
      </Tabs>
    </Drawer>
  );
}
