import './index.scss';
import { createElement, useState, useCallback, useEffect } from 'rax';
import { ComponentProps } from '@vize/types/src';

export default function Dialog({ children, onSelected, commonStyle, on }: ComponentProps) {
  const [visible, setVisible] = useState(false);
  const onClose = useCallback(() => setVisible(false), []);

  useEffect(() => {
    onSelected(({ selected }) => {
      setVisible(selected);
    });
    on('show', () => setVisible(true));
    on('hide', () => setVisible(false));
    on('toggle', () => setVisible(i => !i));
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="vize-materials-universal-dialog" style={commonStyle} onClick={onClose}>
      <div className="content">{children}</div>
      <button className="close" onClick={onClose}>
        关闭
      </button>
    </div>
  );
}
