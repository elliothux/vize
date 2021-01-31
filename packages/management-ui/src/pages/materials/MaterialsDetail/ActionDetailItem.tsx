import * as React from 'react';
import { Avatar, Card } from 'antd';
import { MaterialsActionManifestItem, MaterialsRecord } from 'types';
import { Link } from 'wouter';
import { BiRocket } from 'react-icons/bi';
import { useMemo } from 'react';
import THUMB from 'static/thumb.svg';

interface Props {
  item: [string, MaterialsActionManifestItem];
  lib: MaterialsRecord;
}

const { Meta } = Card;

export function ActionDetailItem({ item: [name, item], lib }: Props) {
  const thumb = item.thumb ? `/materials/${lib.libName}/src/actions/${name}/thumb${item.thumb}` : THUMB;
  const playgroundPath = useMemo(() => `/playground?lib=${lib.libName}&plugin=${name}`, [lib]);

  return (
    <Card
      className="materials-action-item card-item"
      actions={[
        <Link href={playgroundPath} key="0">
          <BiRocket />
          <span>在 Playground 中体验</span>
        </Link>,
      ]}
    >
      <Meta
        avatar={<Avatar src={thumb} />}
        title={
          <>
            <h3>{item.info.name}</h3>
            <p>{name}</p>
          </>
        }
        description={
          <>
            <p>{item.info.desc || '暂无动作描述...'}</p>
            <p className="info-item">
              <span>开发者:</span> {item.info.author}
            </p>
          </>
        }
      />
    </Card>
  );
}
