import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { Tag } from 'antd';
import { editStore, pagesStore, selectStore } from 'states';
import { PageInstance } from '@vize/types';
import { PageContextMenu, showPageContextMenu } from 'components/ContextMenu';
import { useCallback } from 'react';
import { FiHome } from 'react-icons/fi';
import { EllipsisOutlined } from '@ant-design/icons';
import { EditableText } from 'widgets/EditableText';
import { useState } from 'react';

interface Props {
  instance: PageInstance;
  index: number;
}

function IPageItem({ instance: { name, key, isHome }, index }: Props) {
  const { editingPageIndex, setEditingPage } = editStore;
  const isNameEditing = editingPageIndex === index;

  const [focus, setFocus] = useState(false);

  const onClick = useCallback(() => selectStore.selectPage(index), [index]);

  const onContextMenu = useCallback(
    (e: React.MouseEvent) => {
      showPageContextMenu(e, key);
    },
    [key],
  );

  const onFocus = useCallback(() => setFocus(true), [setFocus]);
  const onBlur = useCallback(() => setFocus(false), [setFocus]);

  const onRename = useCallback(
    (name: string) => {
      pagesStore.setPageName(index, name);
    },
    [index],
  );

  const onChangeEditing = useCallback((editing: boolean) => setEditingPage(editing ? index : null), [index]);

  return (
    <React.Fragment key={key.toString()}>
      <div
        className={classNames('vize-page-item', {
          activated: pagesStore.currentPage.key === key,
          editing: isNameEditing,
          focus,
        })}
        tabIndex={-1}
        onClick={onClick}
        onContextMenu={onContextMenu}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <EditableText
          onChange={onRename}
          editing={isNameEditing}
          onChangeEditing={onChangeEditing}
          onClickText={onClick}
        >
          {name}
        </EditableText>

        {isHome ? (
          <Tag color="orange" icon={<FiHome />}>
            home
          </Tag>
        ) : null}

        <EllipsisOutlined className="page-item-menu" onClick={onContextMenu} />
      </div>
      <PageContextMenu pageKey={key} index={index} />
    </React.Fragment>
  );
}

export const PageItem = observer(IPageItem);
