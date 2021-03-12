import './index.scss';
import * as React from 'react';
import { useState } from 'react';
import { Empty, message, Spin } from 'antd';
import { Header } from 'components/Header';
import { FlexPlaceholder } from 'components/FlexPlaceholder';
import { materialsStore } from 'state';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { MaterialsRecord } from 'types';
import { queryLibs } from 'api';
import { useAsyncEffect } from 'hooks';
import { MaterialsItem } from './MaterialsItem';

function IMaterials() {
  const { t } = useTranslation();
  const { materialsList } = materialsStore;

  const [keywords, setKeywords] = useState('');
  const [materials, setMaterials] = useState<MaterialsRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useAsyncEffect(async () => {
    if (!keywords) {
      return setMaterials(materialsList || []);
    }

    setLoading(true);
    const [success, data, response] = await queryLibs(keywords);
    setLoading(false);

    if (success) {
      setMaterials(data!);
    } else {
      message.error(`${t('Failed to get materials list')}：${response.message}`);
    }
  }, [keywords, materialsList]);

  return (
    <Spin spinning={loading || !materials}>
      <Header title={t('Materials Library')} searchText="Search materials" onSearch={setKeywords} />

      {materials.length ? (
        <div className="materials content card-items ">
          {materials.map(i => (
            <MaterialsItem key={i.id} item={i} />
          ))}

          <FlexPlaceholder />
        </div>
      ) : (
        <Empty className="empty-content" description={t('No materials data')} />
      )}
    </Spin>
  );
}

export const Materials = observer(IMaterials);

export { MaterialsDetail } from './MaterialsDetail';
