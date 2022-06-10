import './index.scss';
import * as React from 'react';
import { SelectType } from 'states';
import { observer } from 'mobx-react';
import { i18n } from '@vize/i18n';
import { Empty } from 'widgets/Empty';
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

  return <Empty text={i18n.t('Not available')} />;
}

export const StyleAttrsForm = observer(IStyleAttrsEdit);
