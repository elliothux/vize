import './index.scss';
import * as React from 'react';
import { ChangeEvent, useMemo, useState } from 'react';
import { PageHeader, Button, Input, Tooltip } from 'antd';
import { useAsyncEffect, useUser } from 'hooks';
import { i18n, useCurrentLanguage } from 'i18n';
import { Trans } from 'react-i18next';
import { BreadcrumbNavigator } from './BreadcrumbNavigator';
import AVATAR from 'static/avatar.png';

interface Props {
  title: string;
  searchText?: string;
  onSearch?: (v: string) => void;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  appendAfterSearch?: React.ReactNode;
}

const { Search } = Input;

export function Header({
  title,
  children,
  searchText,
  onSearch,
  searchValue,
  onSearchChange,
  appendAfterSearch,
}: React.PropsWithChildren<Props>) {
  const [, user] = useUser();
  const [language, setLanguage] = useState<string>(i18n.language);

  const onChange = useMemo(
    () => (onSearchChange ? (e: ChangeEvent<HTMLInputElement>) => onSearchChange!(e.target.value) : undefined),
    [onSearchChange],
  );

  useAsyncEffect(async () => {
    await i18n.changeLanguage(language);
  }, [language]);

  const isChinese = useCurrentLanguage() === 'zh';
  return (
    <PageHeader className="main-header">
      <div className="header-top">
        <BreadcrumbNavigator />
        <div className="header-operations">
          {isChinese ? (
            <Button className="languages" icon={'🇺🇸'} onClick={() => setLanguage('en')}>
              English
            </Button>
          ) : (
            <Button className="languages" icon={'🇨🇳'} onClick={() => setLanguage('zh')}>
              中文
            </Button>
          )}
          <Tooltip
            title={
              <div className="user-logout">
                <p>{user?.name}</p>
                <a href="/logout">
                  <Button type="link">
                    <Trans>Log out</Trans>
                  </Button>
                </a>
              </div>
            }
          >
            <img src={AVATAR} alt="avatar" className="avatar" />
          </Tooltip>
        </div>
      </div>

      <h1>{title}</h1>

      {onSearch ? (
        <div className="search-wrap">
          <Search
            value={searchValue}
            placeholder={searchText}
            onSearch={onSearch}
            onChange={onChange}
            enterButton
            size="large"
          />
          {appendAfterSearch}
        </div>
      ) : null}

      {children}
    </PageHeader>
  );
}
