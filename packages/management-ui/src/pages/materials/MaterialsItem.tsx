import * as React from 'react';
import { MaterialsRecord } from 'types';
import { Card, Tooltip } from 'antd';
import { useCallback, useMemo } from 'react';
import { BiShow, BiRocket, BiAnalyse, BiTransfer } from 'react-icons/bi';
import { Link, useLocation } from 'wouter';
import { withAdminValidation, noop, withPreventEvent, preventSyntheticEvent } from 'utils';
import { useTranslation, Trans } from 'react-i18next';
import day from 'dayjs';
import { goToPlaygroundWithContainers } from './utils';

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
    manifest: { containers },
  },
}: Props) {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const created = useMemo(() => day(createdTime).format(`${t('MM-DD')} HH:mm`), [createdTime]);
  const modified = useMemo(() => day(modifiedTime).format(`${t('MM-DD')} HH:mm`), [modifiedTime]);
  const libPath = useMemo(() => `/lib/${id}`, [id]);

  const goToLib = useCallback(() => setLocation(libPath), [libPath]);
  const goToPlayground = useMemo(() => withPreventEvent(() => goToPlaygroundWithContainers(libName, containers)), [
    libName,
  ]);

  return (
    <Card
      className="materials-item card-item"
      cover={<img src={thumb} alt="cover" />}
      actions={[
        <Tooltip title={t('view details')} key="detail">
          <div onClick={preventSyntheticEvent}>
            <Link href={libPath}>
              <BiShow />
            </Link>
          </div>
        </Tooltip>,
        <Tooltip title={t('Try with Playground')} key="playground">
          <div onClick={goToPlayground}>
            <BiRocket />
          </div>
        </Tooltip>,
        <Tooltip title={t('sync manifest')} key="sync">
          <BiAnalyse onClick={withPreventEvent(withAdminValidation(noop))} />
        </Tooltip>,
        <Tooltip title={t('switch version')} key="versions">
          <BiTransfer onClick={withPreventEvent(withAdminValidation(noop))} />
        </Tooltip>,
      ]}
      onClick={goToLib}
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
