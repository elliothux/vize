import './index.scss';
import * as React from 'react';
import { useMemo } from 'react';
import { Button } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { FiPlus, FiChevronsLeft } from 'react-icons/fi';
import { EventEmitTypes, events } from 'libs';
import { MaterialsViewType } from 'components/MaterialsView/HeaderOptions';

export function ChildrenComponentsEdit() {
  const { t } = useTranslation();
  return useMemo(
    () => (
      <div className="editor-prop-item editor-prop-edit-data editor-prop-edit-children">
        <p>
          <FiChevronsLeft />
          {t('Choose a child component to edit')}
        </p>
        <Button
          className="edit-container-button"
          onClick={() => events.emit(EventEmitTypes.SET_MATERIALS_VIEW_TYPE, MaterialsViewType.COMPONENTS)}
          icon={<FiPlus />}
          type="primary"
        >
          <Trans>Add children components</Trans>
        </Button>
      </div>
    ),
    [],
  );
}
