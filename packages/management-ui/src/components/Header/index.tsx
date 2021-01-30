import './index.scss';
import * as React from 'react';
import { PageHeader, Breadcrumb, Button, Input } from 'antd';
import { BiHomeAlt, BiGlobe } from 'react-icons/bi';
import AVATAR from 'static/avatar.png';

interface Props {
  title: string;
  searchText?: string;
  onSearch?: (v: string) => void;
  appendAfterSearch?: React.ReactNode;
}

const { Search } = Input;

export function Header({ title, children, searchText, onSearch, appendAfterSearch }: React.PropsWithChildren<Props>) {
  return (
    <PageHeader className="main-header">
      <div className="header-top">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <BiHomeAlt />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <BiHomeAlt />
            <span>Application List</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Application</Breadcrumb.Item>
        </Breadcrumb>

        <div className="header-operations">
          <Button className="languages" icon={<BiGlobe />}>
            中
          </Button>
          <img src={AVATAR} alt="avatar" className="avatar" />
        </div>
      </div>

      <h1>{title}</h1>

      {onSearch ? (
        <div className="search-wrap">
          <Search placeholder={searchText} onSearch={onSearch} enterButton size="large" />
          {appendAfterSearch}
        </div>
      ) : null}

      {children}
    </PageHeader>
  );
}
