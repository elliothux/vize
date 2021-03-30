import './index.scss';
import * as React from 'react';
import { SelectType } from 'states';
import { observer } from 'mobx-react';
import { NotAvailable } from '../NotAvailable';
import { GlobalStyleForm } from './GlobalStyleForm';
import { ComponentStyleForm } from './ComponentStyleForm';
import { PageStyleForm } from './PageStyleForm';

interface Props {
  selectType: SelectType;
}

function IStyleAttrsEdit({ selectType }: Props) {
  if (selectType === SelectType.GLOBAL) {
    return <GlobalStyleForm />;
  }

  if (selectType === SelectType.PAGE) {
    return <PageStyleForm />;
  }

  if (selectType === SelectType.COMPONENT) {
    return <ComponentStyleForm />;
  }

  return <NotAvailable />;
}

export const StyleAttrsForm = observer(IStyleAttrsEdit);
