import * as React from 'react';
import { ComponentType, useCallback, useMemo, useState } from 'react';
import { useAsyncEffect } from 'hooks';
import { Spin, Result, Button } from 'antd';
import { i18n } from '@vize/i18n';
import { Trans } from 'react-i18next';

interface Props {
  dynamicImport: () => Promise<{ [key: string]: any }>;
  name: string;
  [key: string]: any;
}

export function WithDynamicImport({ dynamicImport, name, ...props }: Props) {
  const [Component, setComponent] = useState<ComponentType>(() => Loading);
  const [retryCursor, setRetryCursor] = useState(0);

  const Error = useMemo(() => withError(setRetryCursor), []);

  useAsyncEffect(async () => {
    setComponent(() => Loading);
    try {
      const { [name]: Component } = await dynamicImport();
      setComponent(() => Component);
    } catch (e) {
      setComponent(() => Error);
    }
  }, [dynamicImport, name, retryCursor]);

  return React.createElement(Component, props);
}

export function withDynamicImport(dynamicImport: Props['dynamicImport'], name: string) {
  return function DynamicImport(props: {}) {
    return <WithDynamicImport dynamicImport={dynamicImport} name={name} {...props} />;
  };
}

function Loading() {
  return <Spin style={{ width: '100%', marginTop: '40vh' }} spinning tip="loading" size="large" />;
}

function withError(setRetryCursor: (setter: (i: number) => number) => void) {
  return function ErrorComponent() {
    const retry = useCallback(() => setRetryCursor(i => i + 1), []);
    return (
      <Result
        status="warning"
        title={i18n.t('Error occurred')}
        extra={
          <Button type="primary" key="console" onClick={retry}>
            <Trans>Retry</Trans>
          </Button>
        }
        style={{ width: '100%', marginTop: '20vh' }}
      />
    );
  };
}
