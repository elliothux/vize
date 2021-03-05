import * as React from 'react';
import { MaterialsRecord } from 'types';
import { Card, Tooltip } from 'antd';
import { useMemo } from 'react';
import { BiShow, BiRocket, BiAnalyse, BiTransfer } from 'react-icons/bi';
import { Link } from 'wouter';
import { withAdminValidation, noop } from 'utils';
import { useTranslation } from 'react-i18next';
import day from 'dayjs';

interface Props {
  item: MaterialsRecord;
}

export function MaterialsItem({
  item: {
    id,
    thumb,
    author,
    createdTime,
    modifiedTime,
    libName,
    displayName,
    desc,
    manifest: { components, plugins, actions },
  },
}: Props) {
  const { t } = useTranslation();
  const created = useMemo(() => day(createdTime).format(`${t('MM-DD')} HH:mm`), [createdTime]);
  const modified = useMemo(() => day(modifiedTime).format(`${t('MM-DD')} HH:mm`), [modifiedTime]);
  const editorPath = useMemo(() => `/lib/${id}`, [id]);
  const playgroundPath = useMemo(() => `/playground?lib=${libName}`, [id]);

  return (
    <Card
      className="materials-item card-item"
      cover={<img src={thumb} />}
      actions={[
        <Tooltip title={t('view details')} key="detail">
          <div>
            <Link href={editorPath}>
              <BiShow />
            </Link>
          </div>
        </Tooltip>,
        <Tooltip title={t('try with Playground')} key="playground">
          <div>
            <Link href={playgroundPath}>
              <BiRocket />
            </Link>
          </div>
        </Tooltip>,
        <Tooltip title={t('sync manifest')} key="sync">
          <BiAnalyse onClick={withAdminValidation(noop)} />
        </Tooltip>,
        <Tooltip title={t('switch version')} key="versions">
          <BiTransfer onClick={withAdminValidation(noop)} />
        </Tooltip>,
      ]}
    >
      <h3>
        {displayName}
        <span> {libName}</span>
      </h3>
      <p className="desc">{desc || '无描述...'}</p>

      <div className="times infos">
        <div className="info-item">
          <p>创建时间</p>
          <p>{created}</p>
        </div>
        <div className="info-item">
          <p>修改时间</p>
          <p>{modified}</p>
        </div>
      </div>

      <div className="infos">
        <div className="info-item">
          <p>开发者</p>
          <p>{author}</p>
        </div>
        <div className="info-item">
          <p>组件</p>
          <p>{Object.keys(components).length}个</p>
        </div>
        <div className="info-item">
          <p>插件</p>
          <p>{Object.keys(plugins).length}个</p>
        </div>
        <div className="info-item">
          <p>动作</p>
          <p>{Object.keys(actions).length}个</p>
        </div>
      </div>
    </Card>
  );
}
