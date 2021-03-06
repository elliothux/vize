import './index.scss';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Maybe, UserRecord } from 'types';
import { useAsyncEffect } from 'hooks';
import { Button, message, Spin, Tooltip } from 'antd';
import { Header } from 'components/Header';
import { FlexPlaceholder } from 'components/FlexPlaceholder';
import { createUser, CreateUserParams, queryUser, updateUser } from 'api';
import { BiPlus } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { withAdminValidation } from 'utils';
import { UserList } from './UserList';
import { EditUser } from './EditUser';

export function Users() {
  const { t } = useTranslation();
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
      message.error(`${t('Failed to get users list')}：${response.message}`);
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
        title={t('User Management')}
        searchText={t('Search users')}
        onSearch={console.log}
        appendAfterSearch={
          <Tooltip title={t('register user')} placement="bottom">
            <Button
              type="primary"
              size="large"
              icon={<BiPlus />}
              onClick={withAdminValidation(() => setCreateVisible(true))}
            />
          </Tooltip>
        }
      />

      <div className="users content card-items ">
        <UserList
          users={users || []}
          onEdit={withAdminValidation((user: UserRecord) => {
            setEditUser(user);
            setCreateVisible(true);
          })}
        />
        <FlexPlaceholder />
      </div>

      <EditUser user={editUser} visible={createVisible} setVisible={setCreateVisible} onComplete={onCreate} />
    </Spin>
  );
}
