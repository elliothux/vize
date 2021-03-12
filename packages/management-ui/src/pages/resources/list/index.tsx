import * as React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { message, Pagination, Empty } from 'antd';
import { FlexPlaceholder } from 'components/FlexPlaceholder';
import { Maybe, ResourceRecord, ResourceType } from 'types';
import { useAsyncEffect } from 'hooks';
import { queryResources } from '../../../api';
import { ResourceItem } from './Item';
import { useTranslation } from 'react-i18next';

interface Props {
  type: ResourceType;
  searchKeywords: string;
  setLoading: (v: boolean) => void;
}

const PAGE_SIZE = 20;

function IResourceList({ setLoading, searchKeywords, type }: Props) {
  const { t } = useTranslation();
  const [resources, setResources] = useState<Maybe<ResourceRecord[]>>(null);
  const [[current, total], setPagination] = useState([-1, 0]);

  const setTotal = useCallback((total: number) => {
    setPagination(([current]) => [current, total]);
  }, []);

  const setCurrentPage = useCallback((current: number) => {
    setPagination(([, total]) => [current, total]);
  }, []);

  const getResources = useCallback(async (type: ResourceType, current: number, keywords: string) => {
    setLoading(true);
    const [success, pages, response] = await queryResources(type, current, PAGE_SIZE, keywords);
    if (success) {
      const { data, total } = pages!;
      setResources(data);
      setTotal(total);
      setLoading(false);
    } else {
      message.error(`${t('Failed to get resources list')}: ${response.message}`);
    }
  }, []);

  const reload = useCallback(() => {
    if (resources && resources.length <= 1 && current > 0) {
      setCurrentPage(current - 1);
    }
    return getResources(type, current, searchKeywords);
  }, [current, type, searchKeywords, resources]);

  useEffect(() => {
    setResources([]);
  }, [type]);

  useEffect(() => {
    setCurrentPage(-1);
    setTimeout(() => setCurrentPage(0), 0);
  }, [searchKeywords]);

  useAsyncEffect(() => {
    if (current < 0) {
      return;
    }
    return getResources(type, current, searchKeywords);
  }, [type, current]);

  if (resources && !resources.length) {
    return <Empty description={t('No resources uploaded yet')} style={{ marginTop: '48px' }} />;
  }

  return (
    <div className="resources content card-items">
      {resources?.map(i => (
        <ResourceItem key={i.id} item={i} type={type} reload={reload} />
      ))}

      <FlexPlaceholder />

      <Pagination
        showSizeChanger={false}
        pageSize={PAGE_SIZE}
        current={current + 1}
        total={total}
        onChange={i => setCurrentPage(i - 1)}
      />
    </div>
  );
}

export const ResourceList = memo(IResourceList);
