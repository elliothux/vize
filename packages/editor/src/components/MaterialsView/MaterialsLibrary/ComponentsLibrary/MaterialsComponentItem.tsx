import * as React from 'react';
import classNames from 'classnames';
import { MaterialsComponentMeta, Maybe } from 'types';
import { useCallback, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { componentsStore } from 'states';
import { SVGRender } from 'widgets/SVGRender';

interface Props {
  item: MaterialsComponentMeta;
  currentItem: Maybe<string>;
  onSelect: (i: MaterialsComponentMeta) => void;
  currentContainerComponentKey: number;
}

export function MaterialsComponentItem({ item, currentItem, onSelect, currentContainerComponentKey }: Props) {
  const {
    identityName,
    info: { name, desc },
    thumb,
    isContainer,
  } = item;

  const [focus, setFocus] = React.useState(false);
  const onFocus = useCallback(() => setFocus(true), [setFocus]);
  const onBlur = useCallback(() => setFocus(false), [setFocus]);

  const onClick = useCallback(() => onSelect(item), [item]);
  const onClickAdd = useCallback(() => componentsStore.addComponentInstance(identityName), [identityName]);

  // TODO: REMOVE
  useEffect(() => {
    setTimeout(() => {
      // onClickAdd();
      // onClickAdd();
      // onClickAdd();
    }, 1000);
  }, []);

  const disabled = currentContainerComponentKey > -1 && isContainer;

  return (
    <div
      className={classNames('vize-materials-component-item', {
        activated: !disabled && currentItem === identityName,
        disabled,
        focus,
      })}
      tabIndex={-1}
      onFocus={disabled ? undefined : onFocus}
      onBlur={onBlur}
      onClick={disabled ? undefined : onClick}
    >
      <div className="content">
        {thumb && <SVGRender content={thumb} />}
        <div>
          <p className="name">{name}</p>
          <p className="desc">{desc}</p>
        </div>
      </div>
      <div className="button" onClick={disabled ? undefined : onClickAdd}>
        <FiPlus />
      </div>
    </div>
  );
}
