import * as React from 'react';
import { Table, Tooltip, Tag, Button } from 'antd';
import { UserRecord } from 'types';
import { bizStore } from 'state';
import { observer } from 'mobx-react';
import AVATAR from 'static/avatar.png';
import day from 'dayjs';

const { Column } = Table;

interface Props {
  users: UserRecord[];
  onEdit: (user: UserRecord) => void;
}

function IUserList({ users, onEdit }: Props) {
  return (
    <Table dataSource={users} bordered>
      <Column
        title="用户"
        key="name"
        render={(t, { avatar, name, id, isAdmin }: UserRecord) => (
          <div className="user-name">
            <div className="user-avatar" style={{ backgroundImage: `url("${avatar || AVATAR}")` }} />
            <Tooltip title={`id: ${id}`}>
              <span>{name}</span>
            </Tooltip>
            {isAdmin ? <Tag color="red">管理员</Tag> : null}
          </div>
        )}
      />
      <Column
        title="所属业务"
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
        title="创建日期"
        dataIndex="createdTime"
        key="createdTime"
        render={createdTime => day(createdTime).format('MM月DD日 HH:mm')}
      />
      <Column
        title="操作"
        key="action"
        render={(t, user: UserRecord) => (
          <>
            <Button type="link" size="small" onClick={() => onEdit(user)}>
              编辑
            </Button>
          </>
        )}
      />
    </Table>
  );
}

export const UserList = observer(IUserList);
