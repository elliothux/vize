import './index.scss';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Modal, PageHeader, Radio, Spin } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { useTranslation } from 'react-i18next';
import { i18n } from '@vize/i18n';
import { camelize } from 'utils';
import { Maybe, ResourceType } from '@vize/types';
import { UploadResources } from './UploadResources';
import { ResourceList } from './list';

export function ResourceManager() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(ResourceType.IMAGE);
  const [extension, setExtension] = useState<Maybe<string>>(null);

  const close = useCallback(() => setVisible(false), []);

  return (
    <Modal
      wrapClassName="vize-resource-manager"
      title=""
      footer={null}
      closeIcon={<span />}
      visible={visible}
      onCancel={close}
      onOk={close}
      width="70vw"
      style={{ maxWidth: '980px' }}
      forceRender
    >
      <PageHeader
        onBack={close}
        title={t('Select {{type}}', { type: camelize(type, true) + 's' }) + (extension ? ` (${extension})` : '')}
        subTitle=""
        extra={<Tabs type={type} setType={setType} />}
      />
      <Spin spinning={loading}>
        <UploadResources type={type} />
        <ResourceList
          visible={visible}
          type={type}
          extension={extension}
          setType={setType}
          setLoading={setLoading}
          setVisible={setVisible}
          setExtension={setExtension}
        />
      </Spin>
    </Modal>
  );
}

interface TabsProps {
  type: ResourceType;
  setType: (type: ResourceType) => void;
}

const tabOptions = [
  { label: i18n.t('Images'), value: ResourceType.IMAGE },
  { label: i18n.t('Videos'), value: ResourceType.VIDEO },
  { label: i18n.t('Audios'), value: ResourceType.AUDIO },
  { label: i18n.t('Others Files'), value: ResourceType.OTHER },
];

function Tabs({ type, setType }: TabsProps) {
  const onChange = useCallback((e: RadioChangeEvent) => setType(e.target.value), []);
  return <Radio.Group options={tabOptions} value={type} onChange={onChange} optionType="button" buttonStyle="solid" />;
}
