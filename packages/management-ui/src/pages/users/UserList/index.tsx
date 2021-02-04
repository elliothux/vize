import * as React from 'react';
import { Table, Tooltip, Tag, Button } from 'antd';
import { UserRecord } from 'types';
import { bizStore } from 'state';
import AVATAR from 'static/avatar.png';
import day from 'dayjs';

const { Column } = Table;

interface Props {
  users: UserRecord[];
  onEdit: (user: UserRecord) => void;
}

export function UserList({ users, onEdit }: Props) {
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
        dataIndex="bizIds"
        key="bizIds"
        render={bizIds =>
          bizIds.split(',').map((id: string) => {
            const biz = bizStore.bizList?.find(i => i.id === parseInt(id, 10));
            if (!biz) {
              return null;
            }
            return (
              <Tag key={id} color="orange">
                {biz.name}
              </Tag>
            );
          })
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
