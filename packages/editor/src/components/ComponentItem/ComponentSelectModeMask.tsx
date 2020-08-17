import * as React from 'react';
import { FiCheck } from 'react-icons/fi';
import { ComponentInstance, Function } from 'types';

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
        {selected ? '已选择' : '选择该组件'}
        {instance.children ? ' [双击选择子组件]' : null}
      </span>
    </div>
  );
}
