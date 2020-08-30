import * as React from 'react';
import { useEffect, useState } from 'react';
import { WithReactChildren } from '../../types';
import { EventEmitTypes, events } from '../../utils';
import { Spin } from 'antd';

export function WithRerender({ children }: WithReactChildren): React.ReactElement {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    events.on(EventEmitTypes.RELOAD_RENDERER, () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  }, []);

  if (loading) {
    return <Spin className="render-loading" size="large" tip="loading" />;
  }

  return children as React.ReactElement;
}
