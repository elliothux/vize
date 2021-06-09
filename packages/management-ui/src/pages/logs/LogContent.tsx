import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { getLog } from 'api';
import { Empty, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { LogType, LogItem } from './types';
import { parseLogs } from './utils';
import { LogContentItem } from './LogItem';
import { useRerender } from '../../hooks';

interface Props {
  keywords: string;
  setLoading: (v: boolean) => void;
  type: LogType;
  file: string;
}

let updateTimer: number;

function endTimer() {
  return window.clearInterval(updateTimer);
}

function startTimer(callback: Function) {
  endTimer();
  updateTimer = window.setInterval(callback, 3000);
}

export function LogContent({ keywords, file, type, setLoading }: Props) {
  const { t } = useTranslation();
  const rerender = useRerender();
  const content = useRef<LogItem[][]>([]);
  const resultContent = useMemo(() => {
    if (!keywords) {
      return content.current;
    }
    return content.current?.map(i =>
      i.filter(({ message }) => {
        return message.includes(keywords);
      }),
    );
  }, [content.current, keywords]);

  const getLogs = useCallback(async (type: LogType, file: string, startLine?: number) => {
    if (!file) {
      return;
    }

    if (!startLine) {
      setLoading(true);
    }
    const [success, data, response] = await getLog(type, file, startLine);
    setLoading(false);

    if (success) {
      const logs = parseLogs(data!);
      if (!logs.length) {
        return;
      }
      content.current = [logs.reverse(), ...(content.current || [])];
      rerender();
    } else {
      message.error(`${t('Failed to get logs')}：${response.message}`);
    }
  }, []);

  const update = useCallback((type: LogType, file: string) => {
    if (!file) {
      return;
    }
    const startLine = content.current?.reduce((accu, lines) => accu + lines.length, 0) || 0;
    return getLogs(type, file, startLine);
  }, []);

  useEffect(() => {
    if (!file) {
      return;
    }
    getLogs(type, file).then(() => startTimer(() => update(type, file)));
    return endTimer;
  }, [file, type]);

  return (
    <>
      {resultContent?.length ? (
        resultContent.map(i => (i.length ? <LogContentItem key={i[0].message} logs={i} /> : null))
      ) : (
        <Empty className="empty-content" description={t('No logs')} />
      )}
    </>
  );
}
