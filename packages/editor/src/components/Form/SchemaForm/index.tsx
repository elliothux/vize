import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { throttle } from 'throttle-debounce';
import { SchemaForm as USchemaForm } from '@formily/antd';
import { setup } from '@formily/antd-components';
import { JsonSchemaProperties } from 'types';
import { noop, createSchema } from 'utils';
import './index.scss';

setup();

export interface SchemaFormProps {
  schema: JsonSchemaProperties;
  value: object;
  onChange: (value: object) => void;
}

function ISchemaForm(props: SchemaFormProps) {
  const { schema: iSchema, value, onChange: iOnChange } = props;

  const schema = useMemo(() => createSchema(iSchema), [iSchema]);
  const onChange = useCallback(throttle(500, iOnChange || noop), [iOnChange]);

  return <USchemaForm schema={schema} value={value} onChange={onChange} />;
}

const SchemaForm = React.memo(ISchemaForm);

export { SchemaForm };
