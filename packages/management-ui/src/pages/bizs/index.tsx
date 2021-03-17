import './index.scss';
import * as React from 'react';
import { Button, Empty, message, Spin, Tooltip } from 'antd';
import { bizStore } from 'state';
import { Header } from 'components/Header';
import { FlexPlaceholder } from 'components/FlexPlaceholder';
import { BizItem } from './BizItem';
import { observer } from 'mobx-react';
import { BiPlus } from 'react-icons/bi';
import { useCallback, useEffect, useState } from 'react';
import { EditBiz } from './EditBiz';
import { createBiz, CreateBizParams, queryBiz, updateBiz, UpdateBizParams } from 'api';
import { BizRecord, Maybe } from 'types';
import { withAdminValidation } from 'utils';
import { useTranslation } from 'react-i18next';
import { useAsyncEffect } from '../../hooks';

function IBizs() {
  const { t } = useTranslation();
  const { bizList } = bizStore;

  const [keywords, setKeywords] = useState('');
  const [bizs, setBizs] = useState<BizRecord[]>([]);
  const [loading, setLoading] = useState(false);

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

  useAsyncEffect(async () => {
    if (!keywords) {
      return setBizs(bizList || []);
    }

    setLoading(true);
    const [success, data, response] = await queryBiz(keywords);
    setLoading(false);

    if (success) {
      setBizs(data!);
    } else {
      setBizs([]);
      message.error(`${t('Failed to get bizs')}：${response.message}`);
    }
  }, [keywords, bizList]);

  return (
    <Spin spinning={loading || !bizList}>
      <Header
        title={t('Business Management')}
        searchText={t('Search business')}
        onSearch={setKeywords}
        appendAfterSearch={
          <Tooltip title={t('register business')} placement="bottom">
            <Button
              type="primary"
              size="large"
              icon={<BiPlus />}
              onClick={withAdminValidation(() => setCreateVisible(true))}
            />
          </Tooltip>
        }
      />

      {bizs.length ? (
        <div className="materials content card-items ">
          {bizs.map(i => (
            <BizItem
              key={i.id}
              item={i}
              onEdit={withAdminValidation((biz: BizRecord) => {
                setEditBiz(biz);
                setCreateVisible(true);
              })}
            />
          ))}

          <FlexPlaceholder />
        </div>
      ) : (
        <Empty className="empty-content" description={t('No bizs data')} />
      )}

      <EditBiz biz={editBiz} visible={createVisible} setVisible={setCreateVisible} onComplete={onCreate} />
    </Spin>
  );
}

export const Bizs = observer(IBizs);
