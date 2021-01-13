import './index.scss';
import * as React from 'react';
import { Input, Tooltip } from 'antd';
import { BiPlus } from 'react-icons/bi';
import LOGO from 'static/logo.svg';
import AVATAR from 'static/avatar.png';
import { useState } from 'react';
import { CreatePage } from '../CreatePage';

const { Search } = Input;

export function TopBar() {
  const [createFormVisible, setCreateFormVisible] = useState(false);

  return (
    <div id="vize-top-bar">
      <img src={LOGO} alt="logo" className="logo" />
      <div className="right">
        <Search placeholder="搜索页面" allowClear size="large" bordered={false} onSearch={console.log} />
        <Tooltip title="创建页面">
          {/*<Link href={RouterPaths.CREATE_PAGE}>*/}
          <BiPlus className="create" onClick={() => setCreateFormVisible(true)} />
          {/*</Link>*/}
        </Tooltip>
        <img src={AVATAR} alt="avatar" className="avatar" />
      </div>

      <CreatePage visible={createFormVisible} setVisible={setCreateFormVisible} />
    </div>
  );
}
