import * as React from 'react';
import { Button, Form, Input, message, Modal, PageHeader, Select, Spin } from 'antd';
import { useCallback, useState } from 'react';
import { promiseWrapper } from 'utils';
import { materialsStore } from 'state';
import { BizRecord, Maybe } from 'types';
import { CreateBizParams, UpdateBizParams } from 'api';
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
  const [loading, setLoading] = useState(false);

  const onBack = useCallback(() => setVisible(false), []);

  const onFinish = useCallback(
    async ({ name, logo, key, materials }: BizRecord & { materials: number[] }) => {
      setLoading(true);

      const [err] = await promiseWrapper(onComplete({ key, name, logo, materials }));
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
        <PageHeader onBack={onBack} title={biz ? '编辑业务' : '创建业务'} subTitle="" />

        <Form {...layout} initialValues={biz || undefined} onFinish={onFinish}>
          <FormItem label="业务名" name="name" hasFeedback rules={[{ required: true, message: '请输入业务名' }]}>
            <Input />
          </FormItem>

          <FormItem
            label="Logo"
            name="logo"
            hasFeedback
            rules={[{ required: true, type: 'url', message: '请输入正确的 Logo URL' }]}
          >
            <Input type="url" />
          </FormItem>

          {!biz ? (
            <FormItem label="Key" name="key" hasFeedback rules={[{ required: true, message: '请输入正确的业务 key' }]}>
              <Input placeholder="将作为URL后缀，创建无无法更改" />
            </FormItem>
          ) : null}

          <Form.Item
            label="物料库"
            name="materials"
            rules={[{ required: true, message: '请至少绑定一个物料库', type: 'array' }]}
          >
            <Select mode="multiple" placeholder="请绑定物料库">
              {materialsStore.materialsList?.map(({ id, displayName, libName }) => (
                <Select.Option value={libName} key={id}>
                  {displayName}
                </Select.Option>
              ))}
            </Select>
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
