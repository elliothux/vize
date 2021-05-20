import './index.scss';
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { ComponentProps } from '@vize/types';
import { SVGRender } from '../../lib/components/SVGRender';
import { preventSyntheticEvent } from '../../lib/utils';
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
    onSelected(({ selected }) => {
      // debugger;
      setVisible(selected);
    });
    on('open', () => setVisible(true));
    on('close', () => setVisible(false));
    on('toggle', () => setVisible(i => !i));
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="vize-materials-universal-dialog"
      // onClick={maskClose ? onClose : undefined}
      onClick={onClose}
      style={{
        backgroundColor: maskBackground,
      }}
    >
      <div className="vize-materials-universal-dialog-content" style={commonStyle} onClick={preventSyntheticEvent}>
        {children}
      </div>
      {closeButton && <SVGRender className="vize-materials-universal-dialog-close" onClick={onClose} content={CLOSE} />}
    </div>
  );
}
