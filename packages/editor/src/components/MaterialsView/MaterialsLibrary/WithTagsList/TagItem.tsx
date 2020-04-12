import * as React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import { useCallback, useState } from "react";

interface Props {
  index: number;
  currentIndex: number;
  name: string;
  onChange: (index: number) => void;
}

function ITagItem({ name, currentIndex, onChange, index }: Props) {
  const [focus, setFocus] = useState(false);

  const onClick = useCallback(
    () => {
      onChange(index);
    },
    [index]
  );

  const onFocus = useCallback(
    () => {
      setFocus(true);
    },
    [setFocus]
  );
  const onBlur = useCallback(() => setFocus(false), [setFocus]);

  return (
    <>
      <div
        className={classNames("vize-tag-item", {
          activated: currentIndex === index,
          focus
        })}
        tabIndex={-1}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <span>{name}</span>
      </div>
    </>
  );
}

export const TagItem = observer(ITagItem);
