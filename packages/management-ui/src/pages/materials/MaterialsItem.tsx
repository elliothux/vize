import * as React from 'react';
import { MaterialsRecord } from 'types';
import { Card, Tooltip } from 'antd';
import { useMemo } from 'react';
import { BiShow, BiRocket, BiAnalyse, BiTransfer } from 'react-icons/bi';
import { Link } from 'wouter';
import { withAdminValidation, noop } from 'utils';
import { useTranslation, Trans } from 'react-i18next';
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
    version,
    manifest: { components, plugins, actions, containers },
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
        <Tooltip title={t('Try with Playground')} key="playground">
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
      <p className="desc">{desc || t('No materials description')}</p>

      <div className="times infos">
        <div className="info-item">
          <p>
            <Trans>Created time</Trans>
          </p>
          <p>{created}</p>
        </div>
        <div className="info-item">
          <p>
            <Trans>Modified time</Trans>
          </p>
          <p>{modified}</p>
        </div>
      </div>

      <div className="infos">
        <div className="info-item">
          <p>
            <Trans>Developer</Trans>
          </p>
          <p>{author}</p>
        </div>
        <div className="info-item">
          <p>
            <Trans>Current Version</Trans>
          </p>
          <p style={{ minWidth: '90px' }}>{version}</p>
        </div>
      </div>
    </Card>
  );
}
