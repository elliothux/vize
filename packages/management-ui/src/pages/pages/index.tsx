import * as React from 'react';
import { bizStore } from 'state';
import { BizSelector } from 'components/BizSelector';
import { useCallback, useEffect, useState } from 'react';
import { BizRecord, PageRecord, Maybe } from 'types';
import { Spin, Pagination } from 'antd';
import { PageItem } from './PageItem';
import { useAsyncEffect } from 'hooks';
import { queryPages } from 'api';

export function Pages() {
  const [biz, setBiz] = useState<Maybe<BizRecord['id']>>(null);
  const [pages, setPages] = useState<Maybe<PageRecord[]>>(null);
  const [[current, total], setPagination] = useState([0, 0]);

  useAsyncEffect(async () => {
    const [success, pages, response] = await queryPages(biz, current);
    // debugger;
  }, [current, biz]);

  const setBizWithResetPagination = useCallback((biz: Maybe<BizRecord['id']>) => {
    setBiz(biz);
    setPagination([0, 0]);
  }, []);

  return (
    <>
      <BizSelector onSelect={setBizWithResetPagination} />
      <Spin>
        <div className="pages">
          {pages?.map(page => (
            <PageItem key={page.id} item={page} />
          ))}
        </div>
      </Spin>
    </>
  );
}

console.log(bizStore);
