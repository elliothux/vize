import * as React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import { Tag } from "antd";
import { pagesStore } from "states";
import { PageInstance } from "types";
import { PageContextMenu, showPageContextMenu } from "components/ContextMenu";
import { useCallback } from "react";
import { FiHome } from "react-icons/fi";
import { EllipsisOutlined } from "@ant-design/icons";
import { preventSyntheticEvent } from "../../../utils";

interface Props {
  instance: PageInstance;
  index: number;
}

function IPageItem({ instance, index }: Props) {
  const { name, key, isHome } = instance;

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target !== e.currentTarget) {
        return;
      }
      pagesStore.setCurrentPage(index);
    },
    [index]
  );

  const onContextMenu = useCallback(
    (e: React.MouseEvent) => {
      showPageContextMenu(e, instance.key);
    },
    [instance]
  );

  return (
    <div
      key={key.toString()}
      className={classNames("page-item", {
        activated: pagesStore.currentPage.key === key
      })}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {name}

      {isHome ? (
        <Tag color="blue" icon={<FiHome />}>
          home
        </Tag>
      ) : null}

      <EllipsisOutlined className="page-item-menu" onClick={onContextMenu} />

      <PageContextMenu pageKey={instance.key} index={index} />
    </div>
  );
}

export const PageItem = observer(IPageItem);
