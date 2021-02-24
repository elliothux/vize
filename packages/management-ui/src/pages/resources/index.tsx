import './index.scss';
import * as React from 'react';
import { useState } from 'react';
import { Button, Menu, Spin, Tooltip } from 'antd';
import { Header } from 'components/Header';
import { FlexPlaceholder } from 'components/FlexPlaceholder';
import { BiUpload } from 'react-icons/bi';
import { UploadResources } from './UploadResources';
import { FileType } from './types';

type PageState = FileType;
const PageState = FileType;

export function Resources() {
  const [loading, setLoading] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(true);
  const [page, setPage] = useState<PageState>(PageState.IMAGES);

  // const getResources = useCallback(async () => {
  //   setLoading(true);
  //   const [success, users, response] = await queryUser();
  //   if (success) {
  //     setUsers(users);
  //     setLoading(false);
  //     console.log(users);
  //   } else {
  //     message.error(`获取用户列表失败：${response.message}`);
  //   }
  // }, []);

  // useAsyncEffect(getUsers, []);
  //
  // useEffect(() => {
  //   if (!createVisible) {
  //     setEditUser(null);
  //   }
  // }, [createVisible]);

  return (
    <Spin spinning={loading}>
      <Header
        title="静态资源管理"
        searchText="搜索资源"
        onSearch={console.log}
        appendAfterSearch={
          <Tooltip title="上传静态资源" placement="bottom">
            <Button type="primary" size="large" icon={<BiUpload />} onClick={() => setUploadVisible(true)} />
          </Tooltip>
        }
      >
        <Menu
          mode="horizontal"
          className="header-menu"
          selectedKeys={[page]}
          onSelect={({ key }) => setPage(key as PageState)}
        >
          <Menu.Item key={PageState.IMAGES}>图像 (0)</Menu.Item>
          <Menu.Item key={PageState.VIDEOS}>视频 (0)</Menu.Item>
          <Menu.Item key={PageState.AUDIOS}>音频 (0)</Menu.Item>
          <Menu.Item key={PageState.OTHERS}>其他 (0)</Menu.Item>
        </Menu>
      </Header>

      <div className="resources content card-items ">
        {/*<UserList*/}
        {/*  users={users || []}*/}
        {/*  onEdit={withAdminValidation((user: UserRecord) => {*/}
        {/*    setEditUser(user);*/}
        {/*    setCreateVisible(true);*/}
        {/*  })}*/}
        {/*/>*/}
        <FlexPlaceholder />
      </div>

      <UploadResources visible={uploadVisible} setVisible={setUploadVisible} type={page} />
    </Spin>
  );
}
