import * as React from 'react';
import classNames from 'classnames';
import { MaterialsComponentMeta, Maybe } from '@vize/types';
import { useCallback, useRef } from 'react';
import { FiLayers, FiPlus } from 'react-icons/fi';
import { componentsStore } from 'states';
import { SVGRender } from 'widgets/SVGRender';
import { useTranslation } from 'react-i18next';
import NO_THUMB from 'static/images/no_thumb.svg';

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

  const { t } = useTranslation();
  const [focus, setFocus] = React.useState(false);
  const onFocus = useCallback(() => setFocus(true), [setFocus]);
  const onBlur = useCallback(() => setFocus(false), [setFocus]);

  const ref = useRef<HTMLDivElement>(null);
  const animateAdd = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const newNode = ref.current.cloneNode(true);
    document.body.appendChild(newNode);
    console.log(newNode);
  }, [ref.current]);

  const onClick = useCallback(() => onSelect(item), [item]);
  const onClickAdd = useCallback(() => {
    // animateAdd();
    componentsStore.addComponentInstance(identityName);
  }, [identityName]);

  const disabled = currentContainerComponentKey > -1 && isContainer;

  return (
    <div
      ref={ref}
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
        {thumb ? (
          <SVGRender content={thumb} />
        ) : (
          <span className="svg-render">
            <img className="no_thumb" src={NO_THUMB} alt="no thumb" />
          </span>
        )}
        <div>
          <p className="name">{name}</p>
          <p className="desc">{desc || t('No component description')}</p>
        </div>
      </div>
      <div className="button" onClick={disabled ? undefined : onClickAdd}>
        <FiPlus />
      </div>
    </div>
  );
}
