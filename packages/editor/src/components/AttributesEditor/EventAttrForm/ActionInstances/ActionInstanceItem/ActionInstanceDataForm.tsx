import * as React from 'react';
import { ActionEventTarget, ActionInstance } from 'types';
import { useActionMetaById } from 'hooks';
import { SchemaForm } from 'components/Form';
import { toJS } from 'mobx';

interface FromProps {
  instance: ActionInstance;
  onChange: (data: object) => void;
}

export function ActionInstanceDataForm({ instance: { data, key, target }, onChange }: FromProps) {
  const { dataForm } = useActionMetaById((target as ActionEventTarget).id)!;
  return <SchemaForm instanceKey={key} form={dataForm!} data={toJS(data!)} onChange={onChange} />;
}
