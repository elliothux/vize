import * as React from 'react';
import { GlobalMeta, JsonSchemaProperties } from 'types';
import { globalStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { i18n } from 'i18n';

const TemplateDataSchema: JsonSchemaProperties = {
  title: { title: i18n.t('Title'), type: 'string', default: 'new', required: true },
  // desc: { title: i18n.t('Description'), type: 'textarea', required: true },
};

// TODO
const PageDataSchema: JsonSchemaProperties = {
  ...TemplateDataSchema,
  // duration: { title: i18n.t('Duration'), type: 'daterange', required: true },
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
