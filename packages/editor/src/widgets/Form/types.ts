export interface FormProps<V> {
  value: V;
  onChange: (value: V) => void;
  title?: string;
  description?: string;
}
