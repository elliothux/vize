import * as React from 'react';
import { JsonSchemaProperties } from 'types';
import { globalStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { observer } from 'mobx-react';
import { i18n } from 'i18n';

const GlobalMetaSchema: JsonSchemaProperties = {
  title: { title: i18n.t('Title'), type: 'string', default: 'new', required: true },
  desc: { title: i18n.t('Description'), type: 'string', widget: 'textarea' },
};

function IGlobalMetaForm() {
  return (
    <SchemaForm
      instanceKey={Number.MAX_SAFE_INTEGER}
      form={GlobalMetaSchema}
      data={globalStore.metaInfo}
      onChange={globalStore.setMetaInfo}
    />
  );
}

export const GlobalMetaForm = observer(IGlobalMetaForm);
