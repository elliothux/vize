import './index.scss';
import * as React from 'react';
import { BiTachometer, BiBook, BiBookContent, BiSidebar, BiExtension, BiComment } from 'react-icons/bi';
import { Link, useLocation } from 'wouter';
import { RouterPaths } from 'router';
import classNames from 'classnames';

export function LeftBar() {
  const [location] = useLocation();

  return (
    <div id="vize-left-bar">
      <Link
        href={RouterPaths.INTRO}
        className={classNames('item', {
          activated: location === RouterPaths.INTRO,
        })}
      >
        <BiTachometer />
        <span>总览</span>
      </Link>

      <Link
        href={RouterPaths.PAGES}
        className={classNames('item', {
          activated: location === RouterPaths.PAGES,
        })}
      >
        <BiSidebar />
        <span>页面</span>
      </Link>

      <Link
        href={RouterPaths.TEMPLATES}
        className={classNames('item', {
          activated: location === RouterPaths.TEMPLATES,
        })}
      >
        <BiBookContent />
        <span>模板</span>
      </Link>

      <Link
        href={RouterPaths.MANAGEMENT}
        className={classNames('item', {
          activated: location === RouterPaths.MANAGEMENT,
        })}
      >
        <BiExtension />
        <span>管理</span>
      </Link>

      <Link href="/" className="item">
        <BiBook />
        <span>文档</span>
      </Link>

      <BiComment className="feedback" />
    </div>
  );
}
