import './index.scss';
import * as React from 'react';
import { Menu } from 'antd';
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
  BiUser,
  BiPalette,
} from 'react-icons/bi';
import { Link, useLocation } from 'wouter';
import { RouterPaths } from 'types';
import { useTranslation } from 'react-i18next';

import LOGO from 'static/logo.svg';
import { useMemo } from 'react';

const { SubMenu } = Menu;

export function LeftBar() {
  const { t } = useTranslation();
  const [location] = useLocation();

  const selectedKeys = useMemo(() => {
    if (location.startsWith('/lib/')) {
      return [RouterPaths.MATERIALS_LIB];
    }
    if (location.startsWith('/log/')) {
      return [RouterPaths.LOG];
    }
    return [location];
  }, [location]);

  return (
    <Menu id="vize-left-bar" theme="dark" mode="inline" defaultOpenKeys={['manage']} selectedKeys={selectedKeys}>
      <div className="name">
        <img src={LOGO} alt="logo" className="logo" />
        <p>Vize</p>
      </div>

      <Menu.Item key={RouterPaths.INTRO} icon={<BiTachometer />}>
        <Link href={RouterPaths.INTRO}>{t('Intro')}</Link>
      </Menu.Item>

      <Menu.Item key={RouterPaths.PAGES} icon={<BiNews />}>
        <Link href={RouterPaths.PAGES}>{t('Pages')}</Link>
      </Menu.Item>

      <Menu.Item key={RouterPaths.TEMPLATES} icon={<BiBookContent />}>
        <Link href={RouterPaths.TEMPLATES}>{t('Templates')}</Link>
      </Menu.Item>

      <SubMenu key="manage" icon={<BiCog />} title={t('Manage')}>
        <Menu.Item key={RouterPaths.MATERIALS_LIB} icon={<BiPackage />}>
          <Link href={RouterPaths.MATERIALS_LIB}>{t('Materials')}</Link>
        </Menu.Item>
        <Menu.Item key={RouterPaths.BIZ} icon={<BiHive />}>
          <Link href={RouterPaths.BIZ}>{t('Business')}</Link>
        </Menu.Item>
        <Menu.Item key={RouterPaths.LOG} icon={<BiHash />}>
          <Link href="/log/all">{t('Logs')}</Link>
        </Menu.Item>
        <Menu.Item key={RouterPaths.USER} icon={<BiUser />}>
          <Link href={RouterPaths.USER}>{t('Users')}</Link>
        </Menu.Item>
        <Menu.Item key={RouterPaths.RESOURCES} icon={<BiPalette />}>
          <Link href={RouterPaths.RESOURCES}>{t('Resources')}</Link>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="doc" icon={<BiBook />}>
        <a href="https://vize-team.github.io/" target="_blank" rel="noopener noreferrer">
          {t('Document')}
        </a>
      </Menu.Item>

      <Menu.Item key="github" icon={<BiHelpCircle />}>
        <a href="https://github.com/vize-team/vize/issues" target="_blank" rel="noopener noreferrer">
          {t('Feedback & Help')}
        </a>
      </Menu.Item>
    </Menu>
  );
}
