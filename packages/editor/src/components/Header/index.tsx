import './index.scss';
import * as React from 'react';
import { memo } from 'react';
import { Tooltip } from 'antd';
import { OperationBar } from './OperationBar';
import { HeaderOperations } from './HeaderOperations';
import LOGO from 'static/images/logo.svg';

function IHeader() {
  return (
    <div className="main-header">
      <Tooltip placement="bottomLeft" trigger="hover" title={<HeaderOperations />}>
        <a href="/">
          <img className="logo" src={LOGO} alt="logo" />
        </a>
      </Tooltip>
      <OperationBar />
    </div>
  );
}

export const Header = memo(IHeader);
