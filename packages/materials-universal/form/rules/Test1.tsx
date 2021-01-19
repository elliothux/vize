import * as React from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

function Test({ value, onChange }: Props) {
  return (
    <div>
      <p>test</p>
      <input value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

export default {
  field: 'example1',
  component: Test,
};
