import * as React from 'react';
import { Button, Drawer, Form, Input, message, PageHeader, Spin } from 'antd';
import { useCallback, useState } from 'react';
import { promiseWrapper } from 'utils';

interface Props<T> {
  visible: boolean;
  setVisible: (v: boolean) => void;
  biz?: T;
  onComplete: (biz: T) => Promise<void>;
}

const { Item: FormItem } = Form;

const layout = {
  labelCol: { span: 5 },
};

export function EditBiz<T>({ biz, onComplete, visible, setVisible }: Props<T>) {
  const [loading, setLoading] = useState(false);

  const onBack = useCallback(() => setVisible(false), []);

  const onFinish = useCallback(
    async (biz: T) => {
      setLoading(true);

      const [err] = await promiseWrapper(onComplete(biz));
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
    <Drawer
      className="edit-biz"
      title=""
      visible={visible}
      placement="bottom"
      headerStyle={{ display: 'none' }}
      onClose={onBack}
      closable
    >
      <Spin spinning={loading}>
        <PageHeader onBack={onBack} title={biz ? '编辑业务' : '创建业务'} subTitle="" />

        <Form {...layout} initialValues={biz} onFinish={onFinish}>
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

          <FormItem>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </FormItem>
        </Form>
      </Spin>
    </Drawer>
  );
}
