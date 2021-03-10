import * as React from 'react';
import { Table, Tooltip, Tag, Button } from 'antd';
import { UserRecord } from 'types';
import { bizStore } from 'state';
import { observer } from 'mobx-react';
import { useTranslation, Trans } from 'react-i18next';
import day from 'dayjs';
import AVATAR from 'static/avatar.png';

const { Column } = Table;

interface Props {
  users: UserRecord[];
  onEdit: (user: UserRecord) => void;
}

function IUserList({ users, onEdit }: Props) {
  const { t } = useTranslation();
  return (
    <Table dataSource={users} bordered>
      <Column
        title={t('User')}
        key="name"
        render={(t, { avatar, name, id, isAdmin }: UserRecord) => (
          <div className="user-name">
            <div className="user-avatar" style={{ backgroundImage: `url("${avatar || AVATAR}")` }} />
            <Tooltip title={`id: ${id}`}>
              <span>{name}</span>
            </Tooltip>
            {isAdmin ? (
              <Tag color="red">
                <Trans>Administrator</Trans>
              </Tag>
            ) : null}
          </div>
        )}
      />
      <Column
        title={t('Business')}
        dataIndex="bizs"
        key="bizs"
        render={(bizs: string[]) =>
          bizStore.getBizsByKeys(bizs)?.map(({ id, name }) => (
            <Tag key={id} color="orange">
              {name}
            </Tag>
          ))
        }
      />
      <Column
        title={t('Created time')}
        dataIndex="createdTime"
        key="createdTime"
        render={createdTime => day(createdTime).format(`${t('YYYY-MM-DD')} HH:mm`)}
      />
      <Column
        title={t('Operations')}
        key="action"
        render={(t, user: UserRecord) => (
          <>
            <Button type="link" size="small" onClick={() => onEdit(user)}>
              <Trans>edit</Trans>
            </Button>
          </>
        )}
      />
    </Table>
  );
}

export const UserList = observer(IUserList);
