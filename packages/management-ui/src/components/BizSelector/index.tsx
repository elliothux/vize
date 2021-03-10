import * as React from 'react';
import { observer } from 'mobx-react';
import { bizStore } from 'state';
import { Tag } from 'antd';
import { BizRecord, Maybe } from 'types';
import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';

const { CheckableTag } = Tag;

interface Props {
  className?: string;
  onSelect: (id: Maybe<BizRecord['id']>) => void;
}

function IBizSelector({ onSelect, className = '' }: Props) {
  const { bizList } = bizStore;

  const [current, setCurrent] = useState<Maybe<BizRecord['id']>>(null);

  useEffect(() => {
    onSelect(current);
  }, [current]);

  if (!bizList) {
    return <div>loading</div>;
  }

  return (
    <div className={`biz-selector ${className}`}>
      <CheckableTag checked={!current} onClick={() => setCurrent(null)}>
        <Trans>All business</Trans>
      </CheckableTag>

      {bizList.map(({ name, key, id }) => (
        <CheckableTag checked={id === current} key={key} onClick={() => setCurrent(id)}>
          {name}
        </CheckableTag>
      ))}
    </div>
  );
}

export const BizSelector = observer(IBizSelector);
