import * as React from 'react';
import { memo, useCallback, useState } from 'react';
import { Button, Select, Form, Input, message, Modal, PageHeader, Spin, Switch } from 'antd';
import { promiseWrapper } from 'utils';
import { UserRecord, Maybe } from 'types';
import { bizStore } from 'state';
import { CreateUserParams } from 'api';
import { useTranslation, Trans } from 'react-i18next';

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
  user: Maybe<UserRecord>;
  onComplete: (biz: CreateUserParams) => Promise<void>;
}

const { Item: FormItem } = Form;

const layout = {
  labelCol: { span: 5 },
};

function IEditUser({ user, onComplete, visible, setVisible }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const onBack = useCallback(() => setVisible(false), []);

  const onFinish = useCallback(
    async ({ extInfo, name, bizs, isAdmin, isDeveloper }: UserRecord) => {
      setLoading(true);

      const [err] = await promiseWrapper(
        onComplete({ name, extInfo, bizs, isAdmin: isAdmin ? 1 : 0, isDeveloper: isDeveloper ? 1 : 0 }),
      );
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
      className="edit-user"
      title=""
      visible={visible}
      onCancel={onBack}
      footer={null}
      closeIcon={<span />}
      destroyOnClose
      closable
    >
      <Spin spinning={loading}>
        <PageHeader onBack={onBack} title={t(user ? 'Edit User' : 'Register User')} subTitle="" />

        <Form {...layout} initialValues={user || {}} onFinish={onFinish}>
          <FormItem
            label={t('Name')}
            name="name"
            hasFeedback
            rules={[{ required: true, message: t('Please enter a valid name') }]}
          >
            <Input />
          </FormItem>

          <FormItem
            label={t('Avatar')}
            name="avatar"
            hasFeedback
            rules={[{ required: false, type: 'url', message: t('Please enter a valid image URL') }]}
          >
            <Input type="url" />
          </FormItem>

          <Form.Item
            label={t('Business')}
            name="bizs"
            rules={[{ required: true, message: t('Please select at least one business'), type: 'array' }]}
          >
            <Select mode="multiple" placeholder={t('Select Business')}>
              {bizStore.bizList?.map(biz => (
                <Select.Option value={biz.key} key={biz.id}>
                  {biz.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="isAdmin" label={t('Admin')} valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="isDeveloper" label={t('Developer')} valuePropName="checked">
            <Switch />
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

export const EditUser = memo(IEditUser);
