import * as React from 'react';
import { MaterialsRecord } from 'types';
import { useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { BiRocket, BiAnalyse, BiListPlus } from 'react-icons/bi';
import { withAdminValidation, noop } from 'utils';
import { useTranslation, Trans } from 'react-i18next';
import day from 'dayjs';
import { goToPlaygroundWithContainers } from '../utils';

interface Props {
  lib: MaterialsRecord;
}

export function MaterialsDetailInfo({ lib }: Props) {
  const { t } = useTranslation();
  const created = useMemo(() => day(lib.createdTime).format(`${t('YYYY-MM-DD')} HH:mm`), [lib]);
  const modified = useMemo(() => day(lib.modifiedTime).format(`${t('YYYY-MM-DD')} HH:mm`), [lib]);
  const goPlayground = useCallback(() => goToPlaygroundWithContainers(lib.libName, lib.manifest.containers), [lib]);

  return (
    <div className="materials-lib-info">
      <div className="thumb" style={{ backgroundImage: `url("${lib.thumb}")` }} />

      <div>
        <h1>{lib?.displayName}</h1>
        <h2>{lib.libName}</h2>
        <p>{lib.desc || t('No materials library description')}</p>

        <div className="infos">
          <div className="info-item">
            <span>ID: </span>
            {lib.id}
          </div>

          <div className="info-item">
            <span>
              <Trans>Current Version</Trans>:{' '}
            </span>
            {lib.version}
          </div>
        </div>

        <div className="infos">
          <div className="info-item">
            <span>
              <Trans>View Runtime</Trans>:{' '}
            </span>
            {lib.runtime || 'react'}
          </div>

          <div className="info-item">
            <span>
              <Trans>Developer</Trans>:{' '}
            </span>
            {lib.author}
          </div>
        </div>

        <div className="infos">
          <div className="info-item">
            <span>
              <Trans>Created time</Trans>:{' '}
            </span>
            {created}
          </div>

          <div className="info-item">
            <span>
              <Trans>Updated time</Trans>:{' '}
            </span>
            {modified}
          </div>
        </div>

        <div className="operations">
          <Button type="primary" icon={<BiRocket />} onClick={goPlayground}>
            Playground
          </Button>
          <Button type="default" icon={<BiAnalyse />} onClick={withAdminValidation(noop)}>
            <Trans>Sync manifest</Trans>
          </Button>
          <Button type="default" icon={<BiListPlus />} onClick={withAdminValidation(noop)}>
            <Trans>Add to business</Trans>
          </Button>
        </div>
      </div>
    </div>
  );
}
