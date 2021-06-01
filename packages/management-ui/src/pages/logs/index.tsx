import './index.scss';
import * as React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Maybe } from '@vize/types';
import { Button, Menu, message, Spin, Select } from 'antd';
import { Header } from '../../components/Header';
import { BiPlus } from 'react-icons/bi';
import { withAdminValidation } from '../../utils';
import { useAsyncEffect } from '../../hooks';
import { queryBiz, getLog, queryLogFiles } from '../../api';
import { LogItem } from '../../../../cgi/src/modules/log/log.interface';
import { parseLogs } from './utils';

type LogType = 'all' | 'error';

export function Logs() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [filesLoading, setFilesLoading] = useState(false);

  const [keywords, setKeywords] = useState('');
  const [type, setType] = useState<LogType>('all');
  const [files, setFiles] = useState<Maybe<string[]>>();
  const [file, setFile] = useState<string>('');
  const [content, setContent] = useState<LogItem[][]>([]);

  useAsyncEffect(async () => {
    setFiles(null);
    setContent([]);
    setFilesLoading(true);
    const [success, data, response] = await queryLogFiles(type);
    setFilesLoading(false);

    if (success) {
      setFiles(data!);
    } else {
      setFiles(null);
      message.error(`${t('Failed to get logs')}：${response.message}`);
    }
  }, [type]);

  useAsyncEffect(
    async (startLine?: number) => {
      setLoading(true);
      const [success, data, response] = await getLog(type, file, startLine);
      setLoading(false);

      if (success) {
        const logs = parseLogs(data!);
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
          selectedKeys={[type]}
          onSelect={({ key }) => setType(key as LogType)}
        >
          <Menu.Item key="all">
            <Trans>All</Trans>
          </Menu.Item>
          <Menu.Item key="error">
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
    </Spin>
  );
}
