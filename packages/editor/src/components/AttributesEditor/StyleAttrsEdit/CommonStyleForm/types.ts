export interface StyleFormProps<T> {
  style: T;
  onChange: (newStyle: T) => void;
  title?: string;
}
