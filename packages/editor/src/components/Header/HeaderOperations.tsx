import './index.scss';
import * as React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { BiTachometer, BiNews, BiBookContent, BiPackage, BiBook, BiPalette } from 'react-icons/bi';

export function HeaderOperations() {
  const { t } = useTranslation();
  return (
    <div className="header-operations">
      <a href="/" target="_blank" rel="noopener noreferrer">
        <Button className="header-operations-item" type="link">
          <BiTachometer />
          <span>{t('Home')}</span>
        </Button>
      </a>
      <a href="/pages" target="_blank" rel="noopener noreferrer">
        <Button className="header-operations-item" type="link">
          <BiNews />
          <span>{t('Pages')}</span>
        </Button>
      </a>
      <a href="/templates" target="_blank" rel="noopener noreferrer">
        <Button className="header-operations-item" type="link">
          <BiBookContent />
          <span>{t('Templates')}</span>
        </Button>
      </a>
      <a href="/libs" target="_blank" rel="noopener noreferrer">
        <Button className="header-operations-item" type="link">
          <BiPackage />
          <span>{t('Materials')}</span>
        </Button>
      </a>
      <a href="/resources" target="_blank" rel="noopener noreferrer">
        <Button className="header-operations-item" type="link">
          <BiPalette />
          <span>{t('Resources')}</span>
        </Button>
      </a>
      <a href="https://vize-team.github.io/" target="_blank" rel="noopener noreferrer">
        <Button className="header-operations-item" type="link">
          <BiBook />
          <span>{t('Document')}</span>
        </Button>
      </a>
    </div>
  );
}
