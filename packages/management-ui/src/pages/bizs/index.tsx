import './index.scss';
import * as React from 'react';
import { Button, Spin, Tooltip } from 'antd';
import { bizStore } from 'state';
import { Header } from 'components/Header';
import { FlexPlaceholder } from 'components/FlexPlaceholder';
import { BizItem } from './BizItem';
import { observer } from 'mobx-react';
import { BiPlus } from 'react-icons/bi';
import { useCallback, useEffect, useState } from 'react';
import { EditBiz } from './EditBiz';
import { createBiz, CreateBizParams, updateBiz, UpdateBizParams } from 'api';
import { BizRecord, Maybe } from 'types';

function IBizs() {
  const { bizList } = bizStore;

  const [editBiz, setEditBiz] = useState<Maybe<BizRecord>>(null);
  const [createVisible, setCreateVisible] = useState(false);

  const onCreate = useCallback(
    async (biz: CreateBizParams | UpdateBizParams) => {
      const [success, result, response] = editBiz
        ? await updateBiz(editBiz.id, biz as UpdateBizParams)
        : await createBiz(biz as CreateBizParams);
      if (!success) {
        throw response;
      }
      setTimeout(() => bizStore.getBizList(), 0);
      setEditBiz(null);
      return result;
    },
    [editBiz],
  );

  useEffect(() => {
    if (!createVisible) {
      setEditBiz(null);
    }
  }, [createVisible]);

  return (
    <Spin spinning={!bizList}>
      <Header
        title="业务管理"
        searchText="搜索业务..."
        onSearch={console.log}
        appendAfterSearch={
          <Tooltip title="创建业务" placement="bottom">
            <Button type="primary" size="large" icon={<BiPlus />} onClick={() => setCreateVisible(true)} />
          </Tooltip>
        }
      />

      <div className="materials content card-items ">
        {bizList?.map(i => (
          <BizItem
            key={i.id}
            item={i}
            onEdit={biz => {
              setEditBiz(biz);
              setCreateVisible(true);
            }}
          />
        ))}

        <FlexPlaceholder />
      </div>

      <EditBiz biz={editBiz} visible={createVisible} setVisible={setCreateVisible} onComplete={onCreate} />
    </Spin>
  );
}

export const Bizs = observer(IBizs);
