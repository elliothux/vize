import * as React from 'react';
import { BizRecord } from 'types';
import { Avatar, Card, Tag } from 'antd';
import { useMemo } from 'react';
import { BiEditAlt, BiPackage } from 'react-icons/bi';
import THUMB from 'static/thumb.svg';
import day from 'dayjs';

interface Props {
  item: BizRecord;
}

export function BizItem({ item: { id, name, materials, key, createdTime, modifiedTime, logo } }: Props) {
  const created = useMemo(() => day(createdTime).format('YYYY年MM月DD日 HH:mm'), [createdTime]);
  const modified = useMemo(() => (modifiedTime ? day(modifiedTime).format('YYYY年MM月DD日 HH:mm') : null), [
    modifiedTime,
  ]);

  return (
    <Card
      className="biz-item card-item"
      actions={[
        <div key="0">
          <BiEditAlt />
          <span>编辑</span>
        </div>,
        <div key="1">
          <BiPackage />
          <span>导入物料库</span>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar src={logo || THUMB} />}
        title={<h3>{name}</h3>}
        description={
          <>
            <div className="infos ids">
              <div className="info-item">
                <p>ID</p>
                <p>{id}</p>
              </div>
              <div className="info-item">
                <p>Key</p>
                <p>{key}</p>
              </div>
            </div>

            <div className="times infos">
              <div className="info-item">
                <p>创建时间</p>
                <p>{created}</p>
              </div>
            </div>

            <div className="times infos">
              <div className="info-item">
                <p>修改时间</p>
                <p>{modified || created}</p>
              </div>
            </div>

            <div className="libs infos">
              <div className="info-item">
                <p>物料库</p>
                <p>
                  {materials?.map(({ libName, displayName }) => (
                    <Tag key={libName} color="orange">
                      {displayName}
                    </Tag>
                  ))}
                </p>
              </div>
            </div>
          </>
        }
      />
    </Card>
  );
}
