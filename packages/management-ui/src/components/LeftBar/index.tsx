import './index.scss';
import * as React from 'react';
import { Menu, Tag } from 'antd';
import {
  BiTachometer,
  BiNews,
  BiHive,
  BiBookContent,
  BiPackage,
  BiCog,
  BiHash,
  BiBook,
  BiHelpCircle,
} from 'react-icons/bi';
import { Link, useLocation } from 'wouter';
import { RouterPaths } from 'router';

import LOGO from 'static/logo.svg';

const { SubMenu } = Menu;

export function LeftBar() {
  const [location] = useLocation();

  return (
    <Menu id="vize-left-bar" theme="dark" mode="inline" defaultOpenKeys={['manage']} activeKey={location}>
      <div className="name">
        <img src={LOGO} alt="logo" className="logo" />
      </div>

      <Menu.Item key={RouterPaths.INTRO} icon={<BiTachometer />}>
        <Link href={RouterPaths.INTRO}>总览</Link>
      </Menu.Item>

      <Menu.Item key={RouterPaths.PAGES} icon={<BiNews />}>
        <Link href={RouterPaths.PAGES}>页面</Link>
      </Menu.Item>

      <Menu.Item key={RouterPaths.TEMPLATES} icon={<BiBookContent />}>
        <Link href={RouterPaths.TEMPLATES}>模板</Link>
      </Menu.Item>

      <SubMenu key="manage" icon={<BiCog />} title="管理">
        <Menu.Item key={RouterPaths.BIZ} icon={<BiHive />}>
          <Link href={RouterPaths.BIZ}>业务</Link>
        </Menu.Item>
        <Menu.Item key={RouterPaths.MATERIALS_MANAGE} icon={<BiPackage />}>
          <Link href={RouterPaths.MATERIALS_MANAGE}>物料</Link>
        </Menu.Item>
        <Menu.Item key={RouterPaths.LOG} icon={<BiHash />}>
          <Link href={RouterPaths.LOG}>日志</Link>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="doc" icon={<BiBook />}>
        文档
      </Menu.Item>

      <Menu.Item key="github" icon={<BiHelpCircle />}>
        反馈 & 帮助
      </Menu.Item>
    </Menu>
  );
}
