import './index.scss';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Maybe, UserRecord } from 'types';
import { useAsyncEffect } from 'hooks';
import { Button, message, Spin, Tooltip } from 'antd';
import { Header } from 'components/Header';
import { FlexPlaceholder } from 'components/FlexPlaceholder';
import { createUser, CreateUserParams, queryUser, updateUser } from 'api';
import { UserList } from './UserList';
import { BiPlus } from 'react-icons/bi';
import { EditUser } from './UserList/EditUser';

export function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Maybe<UserRecord[]>>(null);

  const [editUser, setEditUser] = useState<Maybe<UserRecord>>(null);
  const [createVisible, setCreateVisible] = useState(false);

  const onCreate = useCallback(
    async (user: CreateUserParams) => {
      const [success, result, response] = editUser ? await updateUser(editUser.id, user) : await createUser(user);
      if (!success) {
        throw response;
      }
      setTimeout(getUsers, 0);
      setEditUser(null);
      return result;
    },
    [editUser],
  );

  const getUsers = useCallback(async () => {
    setLoading(true);
    const [success, users, response] = await queryUser();
    if (success) {
      setUsers(users);
      setLoading(false);
      console.log(users);
    } else {
      message.error(`获取用户列表失败：${response.message}`);
    }
  }, []);

  useAsyncEffect(getUsers, []);

  useEffect(() => {
    if (!createVisible) {
      setEditUser(null);
    }
  }, [createVisible]);

  return (
    <Spin spinning={loading}>
      <Header
        title="用户管理"
        searchText="搜索用户"
        onSearch={console.log}
        appendAfterSearch={
          <Tooltip title="创建用户" placement="bottom">
            <Button type="primary" size="large" icon={<BiPlus />} onClick={() => setCreateVisible(true)} />
          </Tooltip>
        }
      />

      <div className="users content card-items ">
        <UserList
          users={users || []}
          onEdit={user => {
            setEditUser(user);
            setCreateVisible(true);
          }}
        />
        <FlexPlaceholder />
      </div>

      <EditUser user={editUser} visible={createVisible} setVisible={setCreateVisible} onComplete={onCreate} />
    </Spin>
  );
}
