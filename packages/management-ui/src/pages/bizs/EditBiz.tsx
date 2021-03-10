import * as React from 'react';
import { Button, Form, Input, message, Modal, PageHeader, Select, Spin } from 'antd';
import { useCallback, useState } from 'react';
import { promiseWrapper } from 'utils';
import { materialsStore } from 'state';
import { BizRecord, Maybe } from 'types';
import { CreateBizParams, UpdateBizParams } from 'api';
import { useTranslation, Trans } from 'react-i18next';
import classNames from 'classnames';

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
  biz: Maybe<BizRecord>;
  onComplete: (biz: UpdateBizParams | CreateBizParams) => Promise<void>;
}

const { Item: FormItem } = Form;

const layout = {
  labelCol: { span: 5 },
};

export function EditBiz({ biz, onComplete, visible, setVisible }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const onBack = useCallback(() => setVisible(false), []);

  const onFinish = useCallback(
    async ({ name, logo, key, materials }: BizRecord & { materials: number[] }) => {
      setLoading(true);

      const [err] = await promiseWrapper(onComplete({ key, name, logo, materials }));
      if (err) {
        message.error(t('failed to save'));
        return setLoading(false);
      }

      message.success(t('saved'));
      setLoading(false);
      setVisible(false);
    },
    [onComplete],
  );

  return (
    <Modal
      className={classNames('edit-biz', { 'is-edit': !!biz })}
      title=""
      visible={visible}
      onCancel={onBack}
      footer={null}
      closeIcon={<span />}
      destroyOnClose
      closable
    >
      <Spin spinning={loading}>
        <PageHeader onBack={onBack} title={t(biz ? 'Edit Business' : 'Register Business')} subTitle="" />

        <Form {...layout} initialValues={biz || undefined} onFinish={onFinish}>
          <FormItem
            label={t('Name')}
            name="name"
            hasFeedback
            rules={[{ required: true, message: t('Please enter a valid business name') }]}
          >
            <Input />
          </FormItem>

          <FormItem
            label="Logo"
            name="logo"
            hasFeedback
            rules={[{ required: true, type: 'url', message: t('Please enter a valid image URL') }]}
          >
            <Input type="url" />
          </FormItem>

          {!biz ? (
            <FormItem
              label="Key"
              name="key"
              hasFeedback
              rules={[{ required: true, message: t('Please enter a valid business key') }]}
            >
              <Input placeholder={t('Used as the URL suffix and cannot be modified')} />
            </FormItem>
          ) : null}

          <Form.Item
            label={t('Materials')}
            name="materials"
            rules={[{ required: true, message: t('Please select at least one materials library'), type: 'array' }]}
          >
            <Select mode="multiple" placeholder={t('Select Materials Library')}>
              {materialsStore.materialsList?.map(({ id, displayName, libName }) => (
                <Select.Option value={libName} key={id}>
                  {displayName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <FormItem>
            <Button type="primary" htmlType="submit">
              <Trans>Confirm</Trans>
            </Button>
          </FormItem>
        </Form>
      </Spin>
    </Modal>
  );
}
