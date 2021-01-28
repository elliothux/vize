import './index.scss';
import * as React from 'react';
import { Input, Tooltip } from 'antd';
import { BiPlus } from 'react-icons/bi';
import { useState } from 'react';
import { CreatePage } from '../CreatePage';
import AVATAR from 'static/avatar.png';

const { Search } = Input;

export function TopBar() {
  const [createFormVisible, setCreateFormVisible] = useState(false);

  return (
    <div id="vize-top-bar">
      <div className="left">
        <Search placeholder="搜索页面" allowClear size="large" bordered={false} onSearch={console.log} />
      </div>
      <div className="right">
        <Tooltip title="创建页面">
          <BiPlus className="create" onClick={() => setCreateFormVisible(true)} />
        </Tooltip>
        <img src={AVATAR} alt="avatar" className="avatar" />
      </div>

      <CreatePage visible={createFormVisible} setVisible={setCreateFormVisible} />
    </div>
  );
}
