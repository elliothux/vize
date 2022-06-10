import './index.scss';
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { ComponentProps } from '@vize/types';
import { SVGRender } from '../../lib/components/SVGRender';
import { isChildrenEmpty, preventSyntheticEvent } from '../../lib/utils';
import { EmptyData } from '../../lib/components/EmptyData';
import CLOSE from './close.svg';

interface Data {
  closeButton: boolean;
  maskClose: boolean;
}

interface Style {
  maskBackground: string;
}

export default function Dialog({
  data: { closeButton, maskClose },
  style: { maskBackground },
  on,
  emit,
  commonStyle,
  onSelected,
  children,
}: ComponentProps<Data, Style>) {
  const [visible, setVisible] = useState(false);
  const onClose = useCallback((e: React.MouseEvent) => {
    preventSyntheticEvent(e);
    setVisible(false);
  }, []);

  useEffect(() => {
    onSelected(({ selected }) => setVisible(selected));
    on('open', () => setVisible(true));
    on('close', () => setVisible(false));
    on('toggle', () => setVisible(i => !i));
  }, []);

  useEffect(() => {
    emit(visible ? 'open' : 'close');
  }, [visible]);

  const onClickMask = useCallback(
    (e: React.MouseEvent) => {
      if (maskClose) {
        preventSyntheticEvent(e);
        setVisible(false);
      }
    },
    [maskClose],
  );

  if (!visible) {
    return null;
  }

  return (
    <div
      className="vize-materials-universal-dialog"
      onClick={onClickMask}
      style={{
        backgroundColor: maskBackground,
      }}
    >
      <div className="vize-materials-universal-dialog-content" style={commonStyle} onClick={preventSyntheticEvent}>
        {isChildrenEmpty(children) ? <EmptyData text="未添加子组件" /> : children}
      </div>
      {closeButton && <SVGRender className="vize-materials-universal-dialog-close" onClick={onClose} content={CLOSE} />}
    </div>
  );
}
