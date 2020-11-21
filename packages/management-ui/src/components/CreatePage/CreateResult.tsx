import * as React from 'react';
import { Result, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Maybe } from 'types';

interface Props {
  pageID: Maybe<number>;
  onClose: () => void;
}

export function CreateResult({ pageID, onClose }: Props) {
  if (pageID) {
    return (
      <Result
        status="success"
        title="创建成功"
        subTitle={`成功创建页面 ID: ${pageID}`}
        extra={
          <>
            <Button type="primary">去编辑</Button>
            <Button onClick={onClose}>关闭</Button>
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
