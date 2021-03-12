import './index.scss';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Maybe, UserRecord } from 'types';
import { useAsyncEffect } from 'hooks';
import { Button, message, Pagination, Spin, Tooltip } from 'antd';
import { Header } from 'components/Header';
import { createUser, CreateUserParams, queryUser, updateUser } from 'api';
import { BiPlus } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { withAdminValidation } from 'utils';
import { UserList } from './UserList';
import { EditUser } from './EditUser';

const PAGE_SIZE = 10;

export function Users() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Maybe<UserRecord[]>>(null);
  const [[current, total], setPagination] = useState([0, 1]);
  const [keywords, setKeywords] = useState('');

  const [editUser, setEditUser] = useState<Maybe<UserRecord>>(null);
  const [createVisible, setCreateVisible] = useState(false);

  const setTotal = useCallback((total: number) => {
    setPagination(([current]) => [current, total]);
  }, []);

  const setCurrentPage = useCallback((current: number) => {
    setPagination(([, total]) => [current, total]);
  }, []);

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

  const getUsers = useCallback(async (keywords: string, current: number) => {
    setLoading(true);
    const [success, users, response] = await queryUser(current, PAGE_SIZE, keywords);
    setLoading(false);

    if (success) {
      const { data, total } = users!;
      setUsers(data);
      setTotal(total);
    } else {
      message.error(`${t('Failed to get users list')}：${response.message}`);
    }
  }, []);

  const onSetKeywords = useCallback((keywords: string) => {
    setCurrentPage(0);
    setKeywords(keywords);
  }, []);

  useAsyncEffect(() => getUsers(keywords, current), [keywords, current]);

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
        onSearch={onSetKeywords}
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

        <Pagination pageSize={PAGE_SIZE} current={current + 1} total={total} onChange={i => setCurrentPage(i - 1)} />
      </div>

      <EditUser user={editUser} visible={createVisible} setVisible={setCreateVisible} onComplete={onCreate} />
    </Spin>
  );
}
