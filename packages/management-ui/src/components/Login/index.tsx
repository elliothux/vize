import './index.scss';
import * as React from 'react';
import { Button, Modal } from 'antd';
import { useUser } from 'hooks';
import LOGO from 'static/logo.svg';

export function Login() {
  const [success, user] = useUser();

  if (user) {
    return null;
  }

  if (!success) {
    return (
      <Modal wrapClassName="login-loading" visible footer={null} closable={false}>
        <img src={LOGO} alt="logo" />
        <span>登录中</span>
      </Modal>
    );
  }

  return (
    <Modal wrapClassName="login" visible footer={null} closable={false}>
      <img src={LOGO} alt="logo" />
      <h2>未登录</h2>
      <a href="/login">
        <Button type="primary">立即登录</Button>
      </a>
    </Modal>
  );
}
