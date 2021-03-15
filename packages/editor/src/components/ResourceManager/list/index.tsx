import './index.scss';
import * as React from 'react';
import { memo, useCallback, useState } from 'react';
import { message, Pagination, Empty, Button } from 'antd';
import { FlexPlaceholder } from 'widgets/FlexPlaceholder';
import { ResourceRecord, ResourceType } from 'sharedTypes';
import { Maybe } from 'types';
import { useAsyncEffect } from 'hooks';
import { queryResources } from 'api';
import { useTranslation } from 'react-i18next';
import { ResourceItem } from './Item';

interface Props {
  type: ResourceType;
  setLoading: (v: boolean) => void;
}

const PAGE_SIZE = 15;

function IResourceList({ type, setLoading }: Props) {
  const { t } = useTranslation();
  const [resources, setResources] = useState<Maybe<ResourceRecord[]>>(null);
  const [selectedResources, setSelectedResources] = useState<ResourceRecord[]>([]);
  const [[current, total], setPagination] = useState([0, 0]);

  const setTotal = useCallback((total: number) => {
    setPagination(([current]) => [current, total]);
  }, []);

  const setCurrentPage = useCallback((current: number) => {
    setPagination(([, total]) => [current, total]);
  }, []);

  const getResources = useCallback(
    async (type: ResourceType, current: number) => {
      if (current < 0) {
        return;
      }
      setLoading(true);
      const [success, pages, response] = await queryResources(type, current, PAGE_SIZE, '');
      if (success) {
        const { data, total } = pages!;
        setResources(data);
        setSelectedResources([]);
        setTotal(total);
        setLoading(false);
      } else {
        message.error(`${t('Failed to get resources list')}: ${response.message}`);
      }
    },
    [type, current],
  );

  const toggleSelect = useCallback(
    (item: ResourceRecord) => {
      const index = selectedResources.findIndex(i => i === item);
      if (index > -1) {
        selectedResources.splice(index, 1);
      } else {
        selectedResources.push(item);
      }
      return setSelectedResources([...selectedResources]);
    },
    [selectedResources],
  );

  useAsyncEffect(() => {
    setResources([]);
    setPagination([-1, 0]);
    setTimeout(() => setPagination([0, 0]), 0);
  }, [type]);

  useAsyncEffect(() => {
    if (current < 0) {
      return;
    }
    return getResources(type, current);
  }, [type, current]);

  if (resources && !resources.length) {
    return <Empty description={t('No resources uploaded yet')} style={{ marginTop: '48px' }} />;
  }

  return (
    <>
      <div className="resources-items">
        {resources?.map(i => (
          <ResourceItem
            key={i.id}
            item={i}
            type={type}
            toggleSelect={toggleSelect}
            selected={selectedResources.includes(i)}
          />
        ))}
        {resources?.length % 5 !== 0 ? <FlexPlaceholder /> : null}
      </div>
      <div className="resources-footer">
        <Pagination
          showSizeChanger={false}
          pageSize={PAGE_SIZE}
          current={current + 1}
          total={total}
          onChange={i => setCurrentPage(i - 1)}
        />
        <Button type="primary">确认</Button>
      </div>
    </>
  );
}

export const ResourceList = memo(IResourceList);
