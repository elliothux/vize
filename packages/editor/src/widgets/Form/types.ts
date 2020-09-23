export interface FormProps<V> {
  value: V;
  onChange: (value: V) => void;
  title?: string;
  description?: string;
}

export interface FieldRenderProps<S, V> {
  schema: S;
  value: V;
  mutators: {
    change: (value: V) => void;
  };
}
