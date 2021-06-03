import './index.scss';
import * as React from 'react';
import { useState } from 'react';
import { RouteComponentProps, useLocation } from 'wouter';
import { DefaultParams } from 'wouter/matcher';
import { Trans, useTranslation } from 'react-i18next';
import { Menu, message, Spin, Select, Empty } from 'antd';
import { Header } from 'components/Header';
import { useAsyncEffect } from 'hooks';
import { getLog, queryLogFiles } from 'api';
import { parseLogs, LogItem } from './utils';
import { LogsContent } from './LogsContent';

type LogType = 'all' | 'error';

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
  const [content, setContent] = useState<LogItem[][]>([]);

  useAsyncEffect(async () => {
    setFiles(undefined);
    setFile(undefined);
    setContent([]);
    setFilesLoading(true);
    const [success, data, response] = await queryLogFiles(type);
    setFilesLoading(false);

    if (success) {
      setFiles(data!);
    } else {
      setFiles(undefined);
      message.error(`${t('Failed to get logs')}：${response.message}`);
    }
  }, [type]);

  useAsyncEffect(
    async (startLine?: number) => {
      if (!file) {
        return;
      }

      setLoading(true);
      const [success, data, response] = await getLog(type, file, startLine);
      setLoading(false);

      if (success) {
        const logs = parseLogs(data!);
        if (!logs.length) {
          return;
        }
        setContent(i => [...i, logs]);
      } else {
        message.error(`${t('Failed to get logs')}：${response.message}`);
      }
    },
    [file, type],
  );

  return (
    <Spin spinning={loading}>
      <Header title={t('System Logs')} searchText={t('Search logs')} onSearch={setKeywords}>
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
        {content?.length ? (
          content.map(i => <LogsContent key={i[0].message} logs={i} />)
        ) : (
          <Empty className="empty-content" description={t('No logs')} />
        )}
      </div>
    </Spin>
  );
}
