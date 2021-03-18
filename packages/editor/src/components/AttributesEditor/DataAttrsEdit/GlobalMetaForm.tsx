import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { GlobalMeta, JsonSchemaProperties } from 'types';
import { globalStore } from 'states';
import { SchemaForm } from 'widgets/Form';
import { observer } from 'mobx-react';
import { getDateTimeString } from 'utils';
import { i18n } from 'i18n';

const TemplateDataSchema: JsonSchemaProperties = {
  title: { title: i18n.t('Title'), type: 'string', default: 'new', required: true },
  desc: { title: i18n.t('Description'), type: 'textarea' },
};

const PageDataSchema: JsonSchemaProperties = {
  ...TemplateDataSchema,
  longTerm: { title: i18n.t('Long term'), type: 'boolean' },
};

const PageDataSchemaWithDuration: JsonSchemaProperties = {
  ...PageDataSchema,
  duration: {
    title: i18n.t('Duration'),
    type: 'daterange',
    'x-props': {
      clearIcon: null,
    },
  },
  expiredJump: {
    title: i18n.t('Expired url'),
    type: 'string',
    default: '',
    'x-rules': 'url',
    'x-props': {
      placeholder: i18n.t('Jump url after page expires'),
    },
  },
};

function IGlobalMetaForm() {
  const { metaInfo, setMetaInfo } = globalStore;

  const schema = useMemo<JsonSchemaProperties>(() => {
    return metaInfo.isTemplate ? TemplateDataSchema : metaInfo.longTerm ? PageDataSchema : PageDataSchemaWithDuration;
  }, [metaInfo.isTemplate, metaInfo.longTerm]);

  const onChange = useCallback((v: Partial<GlobalMeta>) => {
    if (v.longTerm) {
      v.duration = null;
    } else {
      v.duration = v.duration || [getDateTimeString(), getDateTimeString(1000 * 60 * 60 * 24 * 7)];
    }
    setMetaInfo(v);
  }, []);

  return <SchemaForm instanceKey={Number.MAX_SAFE_INTEGER} form={schema} data={metaInfo} onChange={onChange} />;
}

export const GlobalMetaForm = observer(IGlobalMetaForm);
