import * as React from 'react';
import classNames from 'classnames';
import { MaterialsComponentMeta, Maybe } from 'types';
import { useCallback, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { componentsStore } from 'states';
import { SVGRender } from 'components/SVGRender';

interface Props {
    item: MaterialsComponentMeta;
    currentItem: Maybe<string>;
    onSelect: (i: MaterialsComponentMeta) => void;
}

export function MaterialsComponentItem({ item, currentItem, onSelect }: Props) {
    const {
        identityName,
        info: { name, desc },
        thumb,
    } = item;

    const [focus, setFocus] = React.useState(false);
    const onFocus = useCallback(() => setFocus(true), [setFocus]);
    const onBlur = useCallback(() => setFocus(false), [setFocus]);

    const onClick = useCallback(() => onSelect(item), [item]);
    const onClickAdd = useCallback(() => componentsStore.addComponentInstance(identityName), [identityName]);

    // TODO: REMOVE
    useEffect(() => {
        setTimeout(() => {
            onClickAdd();
            onClickAdd();
            onClickAdd();
        }, 1000);
    }, []);

    return (
        <div
            className={classNames('vize-materials-component-item', {
                activated: currentItem === identityName,
                focus,
            })}
            tabIndex={-1}
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={onClick}
        >
            <div className="content">
                {thumb && <SVGRender content={thumb} />}
                <div>
                    <p className="name">{name}</p>
                    <p className="desc">{desc}</p>
                </div>
            </div>
            <div className="button" onClick={onClickAdd}>
                <FiPlus />
            </div>
        </div>
    );
}
