import * as React from 'react';
import { observer } from 'mobx-react';
import { ActionEventTarget, EventInstance } from '@vize/types';
import { useActionMetaById } from 'hooks';
import { SchemaForm } from 'widgets/Form';

interface FromProps {
  instance: EventInstance;
  onChange: (data: object) => void;
}

function IEventInstanceDataForm({ instance: { data, key, target }, onChange }: FromProps) {
  const { dataForm } = useActionMetaById((target as ActionEventTarget).id)!;
  return <SchemaForm instanceKey={key} form={dataForm!} data={data!} onChange={onChange} />;
}

export const EventInstanceDataForm = observer(IEventInstanceDataForm);
