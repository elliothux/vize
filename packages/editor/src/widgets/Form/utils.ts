import { ComponentType } from 'react';
import { FirstParameter, MaterialsForms, Maybe } from 'types';
import { registerFormFieldWidgets } from './Fields';
import { FormProps } from './types';

export function initMaterialsForms(forms: Maybe<MaterialsForms>) {
  if (forms?.fields) {
    registerFormFieldWidgets(
      forms.fields.reduce<FirstParameter<typeof registerFormFieldWidgets>>((accu, { name, component }) => {
        accu[name] = component as ComponentType<FormProps<object>>;
        return accu;
      }, {}),
    );
  }
}
