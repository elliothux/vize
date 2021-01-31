import './index.scss';
import * as React from 'react';
import { Button, Spin } from 'antd';
import { bizStore } from 'state';
import { Header } from 'components/Header';
import { FlexPlaceholder } from 'components/FlexPlaceholder';
import { BizItem } from './BizItem';
import { observer } from 'mobx-react';
import { BiPlus } from 'react-icons/bi';
import { useCallback, useState } from 'react';
import { EditBiz } from './EditBiz';
import { createBiz, CreateBizParams } from 'api';

function IBizs() {
  const { bizList } = bizStore;

  const [createVisible, setCreateVisible] = useState(false);

  const onCreate = useCallback(async (biz: CreateBizParams) => {
    const [success, result, response] = await createBiz(biz);
    if (!success) {
      throw response;
    } else {
      setTimeout(() => bizStore.getBizList(), 0);
    }
    return result;
  }, []);

  return (
    <Spin spinning={!bizList}>
      <Header
        title="业务管理"
        searchText="搜索业务..."
        onSearch={console.log}
        appendAfterSearch={
          <Button type="primary" size="large" icon={<BiPlus />} onClick={() => setCreateVisible(true)} />
        }
      />

      <div className="materials content card-items ">
        {bizList?.map(i => (
          <BizItem key={i.id} item={i} />
        ))}

        <FlexPlaceholder />
      </div>

      <EditBiz<CreateBizParams> visible={createVisible} setVisible={setCreateVisible} onComplete={onCreate} />
    </Spin>
  );
}

export const Bizs = observer(IBizs);
