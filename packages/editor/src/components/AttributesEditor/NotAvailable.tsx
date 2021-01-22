import * as React from 'react';
import { Empty } from 'antd';

export function NotAvailable() {
  return <Empty description="当前配置项不可用" />;
}
