import * as React from 'react';
import { GlobalMeta, JsonSchemaProperties } from 'types';
import { globalStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { observer } from 'mobx-react';
import { useCallback } from 'react';

const TemplateDataSchema: JsonSchemaProperties = {
  title: { title: '活动标题', type: 'string', default: '新页面', required: true },
  desc: { title: '页面描述', type: 'textarea', required: true },
};

const PageDataSchema: JsonSchemaProperties = {
  ...TemplateDataSchema,
  duration: { title: '起止时间', type: 'daterange', required: true },
};

function IGlobalDataForm() {
  const { metaInfo, setMetaInfo } = globalStore;
  const onChange = useCallback((v: Partial<GlobalMeta>) => setMetaInfo(v), []);

  return (
    <div className="editor-prop-item editor-prop-edit-data">
      <SchemaForm instanceKey={999} form={PageDataSchema} data={metaInfo} onChange={onChange} />
    </div>
  );
}

export const GlobalDataForm = observer(IGlobalDataForm);
