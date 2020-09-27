import * as React from 'react';
import { JsonSchemaProperties } from 'types';
import { globalStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { observer } from 'mobx-react';

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

  return (
    <div className="editor-attr-item editor-attr-edit-data">
      <SchemaForm instanceKey={999} form={PageDataSchema} data={metaInfo} onChange={setMetaInfo} />
      {/* {isEmpty(config.dataForm) ? null : (
        <>
          <FormTitle title="容器自定义属性" />
          <SchemaForm
            schema={config.dataForm}
            value={globalData}
            onSubmit={(v: object) => {
              changeGlobalData(v);
              events.emit(EventEmitTypes.REFRESH_SIMULATOR);
            }}
            submitProps={{ showLoading: false, children: '确定' }}
          />
        </>
      )} */}
    </div>
  );
}

export const GlobalDataForm = observer(IGlobalDataForm);
