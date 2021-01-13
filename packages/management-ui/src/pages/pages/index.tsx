import './index.scss';
import * as React from 'react';
import { bizStore } from 'state';
import { BizSelector } from 'components/BizSelector';
import { useCallback, useState } from 'react';
import { BizRecord, PageRecord, Maybe } from 'types';
import { Spin, message, Pagination } from 'antd';
import { PageItem } from './PageItem';
import { useAsyncEffect } from 'hooks';
import { queryPages } from 'api';

const PAGE_SIZE = 10;

export function Pages() {
  const [loading, setLoading] = useState(true);
  const [biz, setBiz] = useState<Maybe<BizRecord['id']>>(null);
  const [pages, setPages] = useState<Maybe<PageRecord[]>>(null);
  const [[current, total], setPagination] = useState([0, 0]);

  useAsyncEffect(async () => {
    setLoading(true);
    const [success, pages, response] = await queryPages(biz, current, PAGE_SIZE);
    if (success) {
      const { data, total } = pages!;
      setPages(data);
      setTotal(total);
      setLoading(false);
      console.log(data);
    } else {
      message.error(`获取页面列表失败：${response.message}`);
    }
  }, [current, biz]);

  const setBizWithResetPagination = useCallback((biz: Maybe<BizRecord['id']>) => {
    setBiz(biz);
    setPagination([0, 0]);
  }, []);

  const setTotal = useCallback((total: number) => {
    setPagination(([current]) => [current, total]);
  }, []);

  const setCurrentPage = useCallback((current: number) => {
    setPagination(([, total]) => [current, total]);
  }, []);

  return (
    <>
      <BizSelector onSelect={setBizWithResetPagination} />
      <Spin spinning={loading}>
        <div className="pages">
          {pages?.map(page => (
            <PageItem key={page.id} item={page} />
          ))}
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
        </div>
      </Spin>
      <Pagination pageSize={PAGE_SIZE} current={current + 1} total={total} onChange={i => setCurrentPage(i - 1)} />
    </>
  );
}

console.log(bizStore);
