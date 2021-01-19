import { FirstParameter, MaterialsForms, Maybe } from 'types';
import { registerFormFields } from './Fields';

export function initMaterialsForms(forms: Maybe<MaterialsForms>) {
  if (!forms) {
    return;
  }

  if (forms.fields) {
    registerFormFields(
      forms.fields.reduce<FirstParameter<typeof registerFormFields>>((accu, { field, component }) => {
        accu[field] = component;
        return accu;
      }, {}),
    );
  }
}
