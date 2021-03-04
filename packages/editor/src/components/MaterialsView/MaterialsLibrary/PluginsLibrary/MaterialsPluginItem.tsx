import * as React from 'react';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { MaterialsPluginMeta, Maybe } from 'types';
import { FiPlus } from 'react-icons/fi';
import { SVGRender } from 'widgets/SVGRender';
import { pluginsStore } from 'states';
import { useTranslation } from 'react-i18next';
import { EventEmitTypes, events } from 'utils';

interface Props {
  item: MaterialsPluginMeta;
  currentItem: Maybe<string>;
  onSelect: (i: MaterialsPluginMeta) => void;
}

export function MaterialsPluginItem({ item, currentItem, onSelect }: Props) {
  const {
    identityName,
    info: { name, desc },
    thumb,
  } = item;

  const { t } = useTranslation();
  const [focus, setFocus] = useState(false);
  const onFocus = useCallback(() => setFocus(true), [setFocus]);
  const onBlur = useCallback(() => setFocus(false), [setFocus]);

  const onClick = useCallback(() => onSelect(item), [item]);
  const onAdd = useCallback(() => {
    pluginsStore.addPluginInstance(identityName);
    events.emit(EventEmitTypes.RELOAD_RENDERER);
  }, [identityName]);

  const disabled = pluginsStore.pluginInstances.findIndex(i => i.plugin === identityName) > -1;

  return (
    <div
      className={classNames('vize-materials-plugin-item', {
        activated: !disabled && currentItem === identityName,
        disabled,
        focus: !disabled && focus,
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
          <p className="desc">{desc || t('No plugin description')}</p>
        </div>
      </div>
      <div className="button" onClick={onAdd}>
        <FiPlus />
      </div>
    </div>
  );
}
