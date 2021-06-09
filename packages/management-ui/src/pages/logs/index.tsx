import './index.scss';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { RouteComponentProps, useLocation } from 'wouter';
import { DefaultParams } from 'wouter/matcher';
import { Trans, useTranslation } from 'react-i18next';
import { Menu, message, Spin, Select, Tooltip, Button, Empty } from 'antd';
import { BiRefresh } from 'react-icons/bi';
import { Header } from 'components/Header';
import { useAsyncEffect } from 'hooks';
import { queryLogFiles } from 'api';
import { LogType } from './types';
import { LogContent } from './LogContent';

interface RouterParams extends DefaultParams {
  type: LogType;
}

export function Logs({ params: { type } }: RouteComponentProps<RouterParams>) {
  const { t } = useTranslation();
  const [, push] = useLocation();
  const [loading, setLoading] = useState(false);
  const [filesLoading, setFilesLoading] = useState(false);

  const [keywords, setKeywords] = useState('');
  const [files, setFiles] = useState<string[]>();
  const [file, setFile] = useState<string>();

  useAsyncEffect(async () => {
    setFilesLoading(true);
    setFiles(undefined);
    setFile(undefined);
    const [success, data, response] = await queryLogFiles(type);
    setFilesLoading(false);

    if (success) {
      setFiles(data!);
    } else {
      message.error(`${t('Failed to get logs')}：${response.message}`);
    }
  }, [type]);

  const onRefresh = useCallback(() => {
    if (!file) {
      return;
    }
    setLoading(true);
    setFile(file => {
      setTimeout(() => setFile(file), 100);
      return undefined;
    });
  }, [file, type]);

  return (
    <Spin spinning={loading}>
      <Header
        title={t('System Logs')}
        searchText={t('Search logs')}
        onSearch={setKeywords}
        appendAfterSearch={
          <Tooltip title={t('refresh')} placement="bottom">
            <Button type="primary" size="large" icon={<BiRefresh />} onClick={onRefresh} />
          </Tooltip>
        }
      >
        <Menu
          mode="horizontal"
          className="header-menu"
          selectedKeys={[`/log/${type}`]}
          onSelect={({ key }) => push(key as string)}
        >
          <Menu.Item key="/log/all">
            <Trans>All</Trans>
          </Menu.Item>
          <Menu.Item key="/log/error">
            <Trans>Error</Trans>
          </Menu.Item>
        </Menu>

        <Select
          className="select-log"
          bordered={false}
          loading={filesLoading}
          placeholder={t('Select log')}
          onChange={setFile}
          value={file}
        >
          {files?.map(file => (
            <Select.Option key={file} value={file}>
              {file}
            </Select.Option>
          ))}
        </Select>
      </Header>

      <div className="log-content">
        {file ? (
          <LogContent keywords={keywords} setLoading={setLoading} type={type} file={file} />
        ) : (
          <Empty className="empty-content" description={t('No logs')} />
        )}
      </div>
    </Spin>
  );
}
