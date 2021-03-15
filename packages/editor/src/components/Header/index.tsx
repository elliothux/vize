import * as React from 'react';
import LOGO from 'static/images/logo.svg';
import { OperationBar } from './OperationBar';
import { memo } from 'react';
import './index.scss';

function IHeader() {
  return (
    <div className="main-header">
      <a href="/">
        <img className="logo" src={LOGO} alt="logo" />
      </a>
      <OperationBar />
    </div>
  );
}

export const Header = memo(IHeader);
