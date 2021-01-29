import * as React from 'react';
import { MaterialsRecord } from 'types';
import { useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { BiRocket, BiAnalyse, BiListPlus } from 'react-icons/bi';
import { useLocation } from 'wouter';
import day from 'dayjs';

interface Props {
  lib: MaterialsRecord;
}

export function MaterialsDetailInfo({ lib }: Props) {
  const [, setLocation] = useLocation();
  const created = useMemo(() => day(lib.createdTime).format('YYYY年MM月DD日 HH:mm'), [lib]);
  const modified = useMemo(() => day(lib.modifiedTime).format('YYYY年MM月DD日 HH:mm'), [lib]);

  const goPlayground = useCallback(() => {
    if (!lib) {
      return;
    }
    setLocation(`/playground?lib=${lib.libName}`);
  }, [lib]);

  return (
    <div className="materials-lib-info">
      <div className="thumb" style={{ backgroundImage: `url("${lib.thumb}")` }} />

      <div>
        <h1>{lib?.displayName}</h1>
        <h2>{lib.libName}</h2>
        <p>{lib.desc || '暂无物料库描述...'}</p>

        <div className="infos">
          <div className="info-item">
            <span>ID: </span>
            {lib.id}
          </div>

          <div className="info-item">
            <span>当前版本: </span>
            {lib.version}
          </div>
        </div>

        <div className="infos">
          <div className="info-item">
            <span>视图框架: </span>
            {lib.runtime || 'react'}
          </div>

          <div className="info-item">
            <span>开发者: </span>
            {lib.author}
          </div>
        </div>

        <div className="infos">
          <div className="info-item">
            <span>创建时间: </span>
            {created}
          </div>

          <div className="info-item">
            <span>更新时间: </span>
            {modified}
          </div>
        </div>

        <div className="operations">
          <Button type="primary" icon={<BiRocket />} onClick={goPlayground}>
            Playground
          </Button>
          <Button type="default" icon={<BiAnalyse />}>
            同步 Manifest
          </Button>
          <Button type="default" icon={<BiListPlus />}>
            添加到业务
          </Button>
        </div>
      </div>
    </div>
  );
}
