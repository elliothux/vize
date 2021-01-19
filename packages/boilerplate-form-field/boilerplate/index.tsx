import './index.scss';
import * as React from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

function Form({ value, onChange }: Props) {
  return (
    <div className="{{libName}}-form-{{name}}">
      <input value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

export default {
  field: '{{name}}',
  component: Form,
};
