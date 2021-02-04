import * as React from 'react';
import { Form, Button, Input, Select, message } from 'antd';
import { bizStore, materialsStore } from 'state';
import { ItemProps, PageDetail } from './types';
import { observer } from 'mobx-react';
import { useCallback, useMemo, useState } from 'react';
import { Maybe } from 'types';
import { getGenerators, GeneratorCGIInfo } from 'api';
import { useAsyncEffect } from 'hooks';

const { Item: FormItem } = Form;
const { Option: SelectOption, OptGroup } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 5 },
};

function IPageDetailForm({ current, setCurrent }: ItemProps<Partial<PageDetail>>) {
  const { bizList } = bizStore;
  const [biz, setBiz] = useState<number>(-1);
  const onValueChange = useCallback((i: Partial<PageDetail>) => {
    if (i.biz) {
      setBiz(i.biz);
    }
  }, []);
  const currentBiz = useMemo(() => bizList?.find(i => i.id === biz), [bizList, biz]);

  const [generators, setGenerators] = useState<Maybe<GeneratorCGIInfo[]>>(null);
  useAsyncEffect(async () => {
    const [success, result, response] = await getGenerators();
    if (!success) {
      console.error(response);
      return message.error('获取生成器列表失败');
    }
    setGenerators(result!);
  }, []);

  return (
    <Form
      {...layout}
      initialValues={current}
      className="page-detail-form"
      onFinish={setCurrent}
      onValuesChange={onValueChange}
    >
      <FormItem label="业务" name="biz" hasFeedback rules={[{ required: true, message: '请选择业务' }]}>
        <Select loading={!bizList}>
          {bizList?.map(({ id, name }) => (
            <SelectOption value={id} key={id}>
              {name}
            </SelectOption>
          ))}
        </Select>
      </FormItem>

      {biz ? (
        <FormItem label="页面容器" name="container" hasFeedback rules={[{ required: true, message: '请选择页面容器' }]}>
          <Select>
            {materialsStore
              .getMaterialsByLibNames(currentBiz?.materials)
              ?.map(({ manifest: { lib: { libName, displayName }, containers } }) => (
                <OptGroup label={displayName} key={libName}>
                  {Object.entries(containers).map(([k, { info: { name } }]) => (
                    <SelectOption value={`{"lib":"${libName}","name":"${k}"}`} key={k} title={name}>
                      {name}
                    </SelectOption>
                  ))}
                </OptGroup>
              ))}
          </Select>
        </FormItem>
      ) : null}

      <FormItem label="生成产物" name="generator" hasFeedback rules={[{ required: true, message: '请选择生成器' }]}>
        <Select loading={!generators}>
          {generators?.map(({ name, desc, key }) => (
            <SelectOption value={key} key={key}>
              {name} - {desc}
            </SelectOption>
          ))}
        </Select>
      </FormItem>

      <FormItem label="页面地址" className="page-detail-key" required hasFeedback>
        <span>https://vize.com/{currentBiz?.key || 'bizKey'}/</span>
        <FormItem name="key" rules={[{ required: true, message: '请输入页面 key' }]}>
          <Input />
        </FormItem>
        <span>/index.html</span>
      </FormItem>

      <FormItem label="页面标题" name="title" rules={[{ required: true, message: '请输入标题' }]} hasFeedback>
        <Input />
      </FormItem>

      <FormItem label="页面描述" name="desc">
        <TextArea />
      </FormItem>

      {/*<Form.Item label="上下线时间">*/}
      {/*  <Form.Item*/}
      {/*    validateStatus="error"*/}
      {/*    help="上线时间"*/}
      {/*    style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}*/}
      {/*  >*/}
      {/*    <DatePicker />*/}
      {/*  </Form.Item>*/}

      {/*  <span style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}>-</span>*/}

      {/*  <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} help="下线时间">*/}
      {/*    <DatePicker />*/}
      {/*  </Form.Item>*/}
      {/*</Form.Item>*/}

      <FormItem>
        <Button type="primary" htmlType="submit">
          创建
        </Button>
      </FormItem>
    </Form>
  );
}

export const PageDetailForm = observer(IPageDetailForm);
