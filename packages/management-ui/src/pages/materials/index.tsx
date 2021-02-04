import './index.scss';
import * as React from 'react';
import { syncLibManifest } from 'api';
import { Spin } from 'antd';
import { Header } from 'components/Header';
import { FlexPlaceholder } from 'components/FlexPlaceholder';
import { MaterialsItem } from './MaterialsItem';
import { materialsStore } from '../../state';
import { observer } from 'mobx-react';

// TODO: Remove
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window['syncLib'] = async () => {
  const [success, libs, response] = await syncLibManifest('*');
  console.log({
    success,
    libs,
    response,
  });
};

function IMaterials() {
  const { materialsList } = materialsStore;

  return (
    <Spin spinning={!materialsList}>
      <Header title="物料库" searchText="搜索物料库..." onSearch={console.log} />

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
