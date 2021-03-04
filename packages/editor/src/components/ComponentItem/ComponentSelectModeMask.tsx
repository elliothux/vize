import * as React from 'react';
import { FiCheck } from 'react-icons/fi';
import { ComponentInstance, Function } from 'types';
import { i18n } from 'i18n';

interface Props {
  instance: ComponentInstance;
  selected: boolean;
  onClick: Function;
  onDoubleClick: Function;
}

export function ComponentSelectModeMask({ instance, selected, onClick, onDoubleClick }: Props) {
  return (
    <div className="vize-component-item-select-mode-mask" onClick={onClick} onDoubleClick={onDoubleClick}>
      <span>
        <FiCheck />
        {i18n.t(selected ? 'Selected' : 'Select this component')}
        {instance.children ? ` [${i18n.t('double click to select children component')}]` : null}
      </span>
    </div>
  );
}
