import './index.scss';
import * as React from 'react';
import { useState } from 'react';
import { Maybe, MaterialsRecord } from 'types';
import { useAsyncEffect } from 'hooks';
import { queryLibs, syncLibManifest } from 'api';
import { message, Spin } from 'antd';
import { Header } from 'components/Header';
import { FlexPlaceholder } from 'components/FlexPlaceholder';
import { MaterialsItem } from './MaterialsItem';

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

export function Materials() {
  const [loading, setLoading] = useState(true);
  const [libs, setLibs] = useState<Maybe<MaterialsRecord[]>>(null);

  useAsyncEffect(async () => {
    setLoading(true);
    const [success, libs, response] = await queryLibs();
    if (success) {
      setLibs(libs);
      setLoading(false);
      console.log(libs);
    } else {
      message.error(`获取物料库列表失败：${response.message}`);
    }
  }, []);

  return (
    <Spin spinning={loading}>
      <Header title="物料库" searchText="搜索物料库..." onSearch={console.log} />

      <div className="materials content card-items ">
        {libs?.map(i => (
          <MaterialsItem key={i.id} item={i} />
        ))}

        <FlexPlaceholder />
      </div>
    </Spin>
  );
}

export { MaterialsDetail } from './MaterialsDetail';
