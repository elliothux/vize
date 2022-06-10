import * as React from 'react';
import { useMemo } from 'react';
import { observer } from 'mobx-react';
import { ComponentInstance, Maybe } from '@vize/types';
import { getMaterialsComponentMeta, formatInjectedStyles } from '@vize/runtime-web';

interface Props {
  instance: ComponentInstance;
}

function IComponentInjectedStyle({ instance: { key, style, component } }: Props) {
  const { enableStyleInject, styleForm } = getMaterialsComponentMeta(component)!;

  const cssProps = useMemo<Maybe<string>>(
    () =>
      enableStyleInject && typeof styleForm === 'object'
        ? formatInjectedStyles(`.vize-component-item[data-key="${key}"]`, style, styleForm)
        : null,
    [style, key],
  );

  if (!cssProps) {
    return null;
  }

  return <style type="text/css">{cssProps}</style>;
}

export const ComponentInjectedStyle = observer(IComponentInjectedStyle);
