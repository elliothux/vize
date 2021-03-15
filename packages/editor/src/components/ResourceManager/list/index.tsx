import './index.scss';
import * as React from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Empty, message, Pagination } from 'antd';
import { FlexPlaceholder } from 'widgets/FlexPlaceholder';
import { ResourceRecord, ResourceType } from 'sharedTypes';
import { Maybe } from 'types';
import { useAsyncEffect } from 'hooks';
import { queryResources } from 'api';
import { useTranslation } from 'react-i18next';
import { EventEmitTypes, events } from 'utils';
import classNames from 'classnames';
import { ResourceItem } from './Item';
import { throttle } from 'throttle-debounce';

interface Props {
  extension: ResourceType;
  type: ResourceType;
  setType: (v: ResourceType) => void;
  setLoading: (v: boolean) => void;
  setVisible: (v: boolean) => void;
  setExtension: (v: Maybe<string>) => void;
}

type ResourceChooseCallback = (resources: ResourceRecord[] | ResourceRecord) => void;

const PAGE_SIZE = 15;

let selectCallback: Maybe<ResourceChooseCallback> = null;

// eslint-disable-next-line max-lines-per-function
function IResourceList({ type, extension, setLoading, setType, setVisible, setExtension }: Props) {
  const { t } = useTranslation();
  const [resources, setResources] = useState<Maybe<ResourceRecord[]>>(null);
  const [selectedResources, setSelectedResources] = useState<ResourceRecord[]>([]);
  const [multiple, setMultiple] = useState(false);
  const [[current, total], setPagination] = useState([0, 0]);

  const setTotal = useCallback((total: number) => {
    setPagination(([current]) => [current, total]);
  }, []);

  const setCurrentPage = useCallback((current: number) => {
    setPagination(([, total]) => [current, total]);
  }, []);

  const getResources = useMemo(
    () =>
      throttle(300, async (type: ResourceType, current: number, extension: Maybe<string>) => {
        setLoading(true);
        const [success, pages, response] = await queryResources(type, extension, current, PAGE_SIZE, '');
        if (success) {
          const { data, total } = pages!;
          setResources(data);
          setSelectedResources([]);
          setTotal(total);
          setLoading(false);
        } else {
          message.error(`${t('Failed to get resources list')}: ${response.message}`);
        }
      }),
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

  const onConfirm = useCallback((resources: ResourceRecord[] | ResourceRecord) => {
    setVisible(false);
    selectCallback!(resources);
  }, []);

  useEffect(() => {
    if (!selectedResources.length || multiple) {
      return;
    }
    onConfirm(selectedResources[0]);
  }, [selectedResources, multiple]);

  useAsyncEffect(() => {
    setResources([]);
    setPagination([0, 0]);
  }, [type]);

  useAsyncEffect(() => {
    if (current < 0) {
      return;
    }
    return getResources(type, current, extension);
  }, [type, current, extension]);

  useEffect(() => {
    events.only(
      EventEmitTypes.CHOOSE_RESOURCES,
      (type: ResourceType, multiple: boolean, extension: Maybe<string>, callback: ResourceChooseCallback) => {
        setType(type);
        setExtension(extension);
        setMultiple(multiple);
        selectCallback = callback;
      },
    );
  }, []);

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
      <div className={classNames('resources-footer', { multiple })}>
        <Pagination
          showSizeChanger={false}
          pageSize={PAGE_SIZE}
          current={current + 1}
          total={total}
          onChange={i => setCurrentPage(i - 1)}
        />
        {multiple && (
          <Button type="primary" onClick={() => onConfirm(selectedResources)}>
            确认
          </Button>
        )}
      </div>
    </>
  );
}

export const ResourceList = memo(IResourceList);
