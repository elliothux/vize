import './index.scss';
import * as React from 'react';
import { BizSelector } from 'components/BizSelector';
import { useCallback, useState } from 'react';
import { BizRecord, PageRecord, Maybe } from 'types';
import { Spin, message, Pagination, Button } from 'antd';
import { PageItem } from './PageItem';
import { useAsyncEffect } from 'hooks';
import { queryPages } from 'api';
import { Header } from '../Header';
import { FlexPlaceholder } from '../FlexPlaceholder';
import { BiPlus } from 'react-icons/bi';
import { CreatePage } from '../CreatePage';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 10;

interface Props {
  isTemplate?: boolean;
}

export function PageList({ isTemplate = false }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [createVisible, setCreateVisible] = useState(false);
  const [biz, setBiz] = useState<Maybe<BizRecord['id']>>(null);
  const [pages, setPages] = useState<Maybe<PageRecord[]>>(null);
  const [[current, total], setPagination] = useState([0, 0]);

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

  useAsyncEffect(async () => {
    setLoading(true);
    const [success, pages, response] = await queryPages(biz, isTemplate || false, current, PAGE_SIZE);
    if (success) {
      const { data, total } = pages!;
      setPages(data);
      setTotal(total);
      setLoading(false);
      console.log(data);
    } else {
      message.error(`${t('Failed to get pages list')}：${response.message}`);
    }
  }, [current, biz, isTemplate]);

  return (
    <Spin spinning={loading}>
      <Header
        title={t(isTemplate ? 'Page List' : 'Template Page List')}
        searchText={t(isTemplate ? 'Search template' : 'Search page')}
        onSearch={console.log}
        appendAfterSearch={
          <Button type="primary" size="large" icon={<BiPlus />} onClick={() => setCreateVisible(true)} />
        }
      />

      <BizSelector className="page-list-biz-selector" onSelect={setBizWithResetPagination} />

      <div className="pages content card-items">
        {pages?.map(page => (
          <PageItem key={page.id} item={page} isTemplate={isTemplate} />
        ))}

        <FlexPlaceholder />

        <Pagination pageSize={PAGE_SIZE} current={current + 1} total={total} onChange={i => setCurrentPage(i - 1)} />
      </div>

      <CreatePage visible={createVisible} setVisible={setCreateVisible} isTemplate={isTemplate} />
    </Spin>
  );
}
