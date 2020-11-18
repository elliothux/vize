import * as React from 'react';
import { Result, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  id?: number;
}

export function CreateResult({ id }: Props) {
  if (id) {
    return (
      <Result
        status="success"
        title="创建成功"
        subTitle={`成功创建页面 ID: ${id}`}
        extra={
          <>
            <Button type="primary">去编辑</Button>
            <Button>关闭</Button>
          </>
        }
      />
    );
  }

  return (
    <div className="page-create-result">
      <LoadingOutlined />
      <p>请稍候</p>
    </div>
  );
}
