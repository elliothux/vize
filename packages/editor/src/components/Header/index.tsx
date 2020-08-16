import * as React from 'react';
import LOGO from 'static/images/logo.svg';
import { OperationBar } from '../OperationBar';
import './index.scss';

export function Header() {
  return (
    <div className="main-header">
      <a href="/">
        <img className="logo" src={LOGO} alt="logo" />
      </a>
      <OperationBar />
    </div>
  );
}
