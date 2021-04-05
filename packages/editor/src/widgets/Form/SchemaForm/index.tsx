import './index.scss';
import * as React from 'react';
import { useCallback, useMemo, useEffect } from 'react';
import { throttle } from 'throttle-debounce';
import { SchemaForm as USchemaForm, Submit } from '@uform/antd';
import { SchemaFormProps } from 'types';
import { noop, getSchemaDefaultValue, isEmpty } from 'utils';
import { createSchema } from 'libs';

function ISchemaForm(props: SchemaFormProps) {
  const { schema: iSchema, value, onChange: iOnChange, onSubmit, submitProps } = props;

  const schema = useMemo(() => createSchema(iSchema), [iSchema]);
  const onChange = useCallback(throttle(200, iOnChange || noop), [iOnChange]);

  useEffect(() => {
    const defaultValue = getSchemaDefaultValue(iSchema);
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
    <USchemaForm schema={schema} initialValues={v} value={v} onChange={onChange} onSubmit={onSubmit}>
      {submitProps && (
        <Submit className="submit-btn" {...submitProps}>
          {submitProps.children}
        </Submit>
      )}
    </USchemaForm>
  );
}

const SchemaForm = React.memo(ISchemaForm);

export { SchemaForm };
