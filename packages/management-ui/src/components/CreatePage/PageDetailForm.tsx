import * as React from 'react';
import { Form, Button, Input, Select, message } from 'antd';
import { bizStore, materialsStore } from 'state';
import { observer } from 'mobx-react';
import { useCallback, useMemo, useState } from 'react';
import { Maybe } from 'types';
import { getGenerators, GeneratorCGIInfo } from 'api';
import { useAsyncEffect } from 'hooks';
import { useTranslation, Trans } from 'react-i18next';
import { ItemProps, PageDetail } from './types';

const { Item: FormItem } = Form;
const { Option: SelectOption, OptGroup } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 6 },
};

// eslint-disable-next-line max-lines-per-function
function IPageDetailForm({ current, setCurrent }: ItemProps<Partial<PageDetail>>) {
  const { bizList } = bizStore;
  const { t } = useTranslation();
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
      message.error(t('Failed to get generator list'));
      return;
    }
    setGenerators(result!);
  });

  return (
    <Form
      {...layout}
      initialValues={current}
      className="page-detail-form"
      onFinish={setCurrent}
      onValuesChange={onValueChange}
    >
      <FormItem
        label={t('Business')}
        name="biz"
        hasFeedback
        rules={[{ required: true, message: t('Please select one business∏') }]}
      >
        <Select loading={!bizList}>
          {bizList?.map(({ id, name }) => (
            <SelectOption value={id} key={id}>
              {name}
            </SelectOption>
          ))}
        </Select>
      </FormItem>

      {biz ? (
        <FormItem
          label={t('Container')}
          name="container"
          hasFeedback
          rules={[{ required: true, message: t('Please select one container') }]}
        >
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

      <FormItem
        label={t('Generate Target')}
        name="generator"
        hasFeedback
        rules={[{ required: true, message: t('Please select one generator') }]}
      >
        <Select loading={!generators}>
          {generators?.map(({ name, desc, key }) => (
            <SelectOption value={key} key={key}>
              {name} - {desc}
            </SelectOption>
          ))}
        </Select>
      </FormItem>

      <FormItem label={t('Page URL')} className="page-detail-key" required hasFeedback>
        <span>https://vize.com/{currentBiz?.key || 'bizKey'}/</span>
        <FormItem name="key" rules={[{ required: true, message: t('Please enter a valid url') }]}>
          <Input />
        </FormItem>
        <span>/index.html</span>
      </FormItem>

      <FormItem
        label={t('Page Title')}
        name="title"
        rules={[{ required: true, message: t('Please enter a valid title') }]}
        hasFeedback
      >
        <Input />
      </FormItem>

      <FormItem label={t('Page Description')} name="desc">
        <TextArea />
      </FormItem>

      <FormItem>
        <Button type="primary" htmlType="submit">
          <Trans>Create</Trans>
        </Button>
      </FormItem>
    </Form>
  );
}

export const PageDetailForm = observer(IPageDetailForm);
