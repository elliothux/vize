import * as React from 'react';
import { useCallback, useMemo, useEffect } from 'react';
import { throttle } from 'throttle-debounce';
import { SchemaForm as USchemaForm } from '@formily/antd';
import { setup } from '@formily/antd-components';
import { SchemaFormProps } from 'types';
import { noop, createSchema, getSchemaDefault, isEmpty } from 'utils';
import './index.scss';

setup();

function ISchemaForm(props: SchemaFormProps) {
  const { schema: iSchema, value, onChange: iOnChange, onSubmit } = props;

  const schema = useMemo(() => createSchema(iSchema), [iSchema]);
  const onChange = useCallback(throttle(500, iOnChange || noop), [iOnChange]);

  useEffect(() => {
    const defaultValue = getSchemaDefault(iSchema);
    if (isEmpty(value) && !isEmpty(defaultValue)) {
      if (onSubmit) {
        onSubmit(defaultValue);
      } else {
        onChange(defaultValue);
      }
    }
  }, [iSchema, onChange]);

  const v = { ...value };

  return (
    <USchemaForm
      schema={schema as React.ComponentProps<typeof USchemaForm>['schema']}
      value={v}
      onChange={onChange}
      onSubmit={onSubmit}
    >
      {/*{submitProps && (*/}
      {/*  <Submit className="submit-btn" {...submitProps}>*/}
      {/*    {submitProps.children}*/}
      {/*  </Submit>*/}
      {/*)}*/}
    </USchemaForm>
  );
}

const SchemaForm = React.memo(ISchemaForm);

export { SchemaForm };
