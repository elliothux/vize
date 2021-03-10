import './index.scss';
import * as React from 'react';
import { Spin } from 'antd';
import { Header } from 'components/Header';
import { FlexPlaceholder } from 'components/FlexPlaceholder';
import { materialsStore } from 'state';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { MaterialsItem } from './MaterialsItem';

function IMaterials() {
  const { t } = useTranslation();
  const { materialsList } = materialsStore;

  return (
    <Spin spinning={!materialsList}>
      <Header title={t('Materials Library')} searchText="Search materials" onSearch={console.log} />

      <div className="materials content card-items ">
        {materialsList?.map(i => (
          <MaterialsItem key={i.id} item={i} />
        ))}

        <FlexPlaceholder />
      </div>
    </Spin>
  );
}

export const Materials = observer(IMaterials);

export { MaterialsDetail } from './MaterialsDetail';
