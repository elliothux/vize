import * as React from 'react';
import { Result, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Maybe, PageRecord } from 'types';
import { goToEditor } from '../PageList/utils';

interface Props {
  pageRecord: Maybe<PageRecord>;
  onClose: () => void;
}

export function CreateResult({ pageRecord, onClose }: Props) {
  if (pageRecord) {
    return (
      <Result
        status="success"
        title="创建成功"
        subTitle={`成功创建页面 ID: ${pageRecord.id}`}
        extra={
          <>
            <Button type="primary" onClick={() => goToEditor(pageRecord)}>
              去编辑
            </Button>
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
