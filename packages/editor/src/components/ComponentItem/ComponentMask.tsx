import * as React from 'react';
import { ComponentInstance, MaterialsComponentMeta, Function, WithReactChildren } from '@vize/types';
import { useMemo } from 'react';
import { getMaterialsComponentMeta } from '@vize/runtime-web';
import { observer } from 'mobx-react';
import { editStore } from 'states';
import { i18n } from '@vize/i18n';

interface Props {
  instance: ComponentInstance;
  selected: boolean;
  onClick: Function;
  onDoubleClick: Function;
  onContextMenu: Function;
}

function IComponentMask({ instance, onClick, onDoubleClick, onContextMenu, children }: WithReactChildren<Props>) {
  const {
    info: { name },
  } = useMemo<MaterialsComponentMeta>(() => getMaterialsComponentMeta(instance.component)!, [instance.component]);

  const desc = useMemo(
    () =>
      instance.children
        ? `[${i18n.t('Double click to edit children')}]`
        : instance.hotAreas
        ? `[${i18n.t('Double click to edit hotarea')}]`
        : '',
    [instance],
  );

  const { previewMode } = editStore;

  return (
    <div
      className={`vize-component-item-mask${previewMode ? ' preview-mode' : ''}`}
      onClick={previewMode ? undefined : onClick}
      onDoubleClick={previewMode ? undefined : onDoubleClick}
      onContextMenu={previewMode ? undefined : onContextMenu}
    >
      <span>
        <span>{name}</span> (key={instance.key}) {desc}
      </span>
      {children}
    </div>
  );
}

export const ComponentMask = observer(IComponentMask);
