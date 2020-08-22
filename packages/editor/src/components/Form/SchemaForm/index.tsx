import * as React from 'react';
import { useCallback, useMemo, useEffect } from 'react';
import { throttle } from 'throttle-debounce';
import { SchemaForm as USchemaForm, ISubmitProps, Submit } from '@formily/antd';
import { setup } from '@formily/antd-components';
import { JsonSchemaProperties } from 'types';
import { noop, createSchema, getSchemaDefault, isEmpty } from 'utils';
import './index.scss';

setup();

export interface SchemaFormProps {
  schema: JsonSchemaProperties;
  value: object;
  onChange?: (value: object) => void;
  onSubmit?: (value: object) => void;
  submitProps?: ISubmitProps;
}

function ISchemaForm(props: SchemaFormProps) {
  const { schema: iSchema, value, onChange: iOnChange, onSubmit, submitProps } = props;

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
    <USchemaForm schema={schema} value={v} onChange={onChange} onSubmit={onSubmit}>
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
