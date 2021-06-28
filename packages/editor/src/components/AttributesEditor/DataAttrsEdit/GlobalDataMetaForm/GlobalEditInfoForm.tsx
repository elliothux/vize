import * as React from 'react';
import { useCallback } from 'react';
import { Checkbox, Modal } from 'antd';
import { editStore } from 'states';
import { observer } from 'mobx-react';
import { LayoutMode } from '@vize/types';
import { useTranslation, Trans } from 'react-i18next';
import { BiSelection, BiWater } from 'react-icons/bi';

function IGlobalEditInfoForm() {
  const { layoutMode } = editStore;
  const { t } = useTranslation();

  const setLayoutMode = useCallback((mode: LayoutMode) => {
    if (mode === editStore.layoutMode) {
      return;
    }
    Modal.confirm({
      title: t('Confirm toggle layout-mode?'),
      content: t('Some existing layout information may be lost'),
      onOk: () => editStore.toggleLayoutMode(mode),
    });
  }, []);

  console.log({ layoutMode });

  return (
    <div className="edit-info-item">
      <span className="edit-info-item-title">
        <Trans>Layout Mode</Trans>:
      </span>
      <div className="mode-items">
        <div className="mode-item">
          <Checkbox checked={layoutMode === LayoutMode.STREAM} onClick={() => setLayoutMode(LayoutMode.STREAM)}>
            <BiWater />
            <h3>
              <Trans>Stream Layout</Trans>
            </h3>
            <p>
              <Trans>All components are arranged from top to bottom. And their size is adaptive</Trans>
            </p>
          </Checkbox>
        </div>
        <div className="mode-item">
          <Checkbox checked={layoutMode === LayoutMode.FREE} onClick={() => setLayoutMode(LayoutMode.FREE)}>
            <BiSelection />
            <h3>
              <Trans>Free Layout</Trans>
            </h3>
            <p>
              <Trans>
                All components are freely dragged to arrange. And the size is scaled according to the screen width
              </Trans>
            </p>
          </Checkbox>
        </div>
      </div>
    </div>
  );
}

export const GlobalEditInfoForm = observer(IGlobalEditInfoForm);
