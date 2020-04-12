import * as React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import { useCallback } from "react";

interface Props {
  index: number;
  currentIndex: number;
  name: string;
  onChange: (index: number) => void;
}

function ITagItem({ name, currentIndex, onChange, index }: Props) {
  const onClick = useCallback(
    () => {
      onChange(index);
    },
    [index]
  );

  return (
    <>
      <div
        className={classNames("vize-tag-item", {
          activated: currentIndex === index
        })}
        onClick={onClick}
      >
        <span>{name}</span>
      </div>
    </>
  );
}

export const TagItem = observer(ITagItem);
