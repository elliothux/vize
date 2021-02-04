import * as React from 'react';
import { useCallback, useState } from 'react';
import { Button, Select, Form, Input, message, Modal, PageHeader, Spin, Switch } from 'antd';
import { promiseWrapper } from 'utils';
import { UserRecord, Maybe } from 'types';
import { bizStore } from 'state';
import { CreateUserParams } from 'api';

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

export function EditUser({ user, onComplete, visible, setVisible }: Props) {
  const [loading, setLoading] = useState(false);

  const onBack = useCallback(() => setVisible(false), []);

  const onFinish = useCallback(
    async ({ extInfo, name, bizs, isAdmin }: UserRecord & { bizs: number[] }) => {
      setLoading(true);

      const [err] = await promiseWrapper(
        onComplete({ name, extInfo, bizIds: bizs.join(','), isAdmin: isAdmin ? 1 : 0 }),
      );
      if (err) {
        message.error('保存失败');
        return setLoading(false);
      }

      message.success('成功');
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
        <PageHeader onBack={onBack} title={user ? '编辑用户' : '创建用户'} subTitle="" />

        <Form {...layout} initialValues={user || {}} onFinish={onFinish}>
          <FormItem label="名字" name="name" hasFeedback rules={[{ required: true, message: '请输入名字' }]}>
            <Input />
          </FormItem>

          <FormItem
            label="头像"
            name="avatar"
            hasFeedback
            rules={[{ required: false, type: 'url', message: '请输入正确的图片 URL' }]}
          >
            <Input type="url" />
          </FormItem>

          <Form.Item
            label="业务"
            name="bizs"
            rules={[{ required: true, message: '请至少选择一个业务', type: 'array' }]}
          >
            <Select mode="multiple" placeholder="请选择所属业务">
              {bizStore.bizList?.map(biz => (
                <Select.Option value={biz.id} key={biz.id}>
                  {biz.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="isAdmin" label="是否管理员" valuePropName="checked">
            <Switch />
          </Form.Item>

          <FormItem>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </FormItem>
        </Form>
      </Spin>
    </Modal>
  );
}
