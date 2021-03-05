import * as React from 'react';
import { Empty } from 'antd';
import { i18n } from 'i18n';

export function NotAvailable() {
  return <Empty description={i18n.t('Not available')} />;
}
