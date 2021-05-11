import './index.scss';
import * as React from 'react';
import { ErrorInfo, useCallback } from 'react';
import { WithReactChildren } from 'types';
import { ErrorBoundary } from 'widgets/ErrorBoundary';
import { events, EventEmitTypes, getMaterialsContainerMeta } from 'libs';
import { getMaterialsComponentMeta, getMaterialsPluginMeta } from 'runtime';
import { BiError } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { editStore } from 'states';
import iframeStyle from './index.iframe.scss';

interface Props {
  type: 'container' | 'component' | 'plugin';
  identityName?: string;
  isForm?: boolean;
}

events.on(EventEmitTypes.STORE_INITIALED, () => editStore.setIframeStyle('MaterialsErrorBoundary', iframeStyle));

export function MaterialsErrorBoundary(props: WithReactChildren<Props>) {
  const renderError = useCallback(
    (error: Error, errorInfo: ErrorInfo) => React.createElement(MaterialsError, { ...props, error, errorInfo }),
    [props.type, props.identityName],
  );
  return <ErrorBoundary renderError={renderError}>{props.children}</ErrorBoundary>;
}

interface ErrorProps extends Props {
  error: Error;
  errorInfo: ErrorInfo;
}

function MaterialsError({ error, errorInfo, type, identityName, isForm }: ErrorProps) {
  const { t } = useTranslation();
  const {
    name: materialsName,
    info: { name, author },
  } =
    type === 'container'
      ? getMaterialsContainerMeta()!
      : type === 'plugin'
      ? getMaterialsPluginMeta(identityName!)!
      : getMaterialsComponentMeta(identityName!)!;

  const onDebug = useCallback(() => {
    console.error(errorInfo.componentStack);
    console.error(error);
  }, [error]);

  return (
    <div className="materials-error-boundary">
      <p className="title">
        <BiError />
        <span>{t(isForm ? `Error occurred in materials lib's form` : `Error occurred in materials lib`)}</span>
      </p>

      <p className="name">
        <span>{t('Name')}:</span>
        {name} ({materialsName})
      </p>

      <p className="developer">
        <span>{t('Developer')}:</span>
        {author}
      </p>

      <p className="tip">{t("Please contact the material's developer")}</p>

      <button onClick={onDebug}>print error stacks</button>
    </div>
  );
}
