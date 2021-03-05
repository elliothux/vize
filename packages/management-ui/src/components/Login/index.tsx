import './index.scss';
import * as React from 'react';
import { Button, Modal } from 'antd';
import { useUser } from 'hooks';
import { Trans } from 'react-i18next';
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
        <span>
          <Trans>logging in</Trans>
        </span>
      </Modal>
    );
  }

  return (
    <Modal wrapClassName="login" visible footer={null} closable={false}>
      <img src={LOGO} alt="logo" />
      <h2>
        <Trans>Not logged in</Trans>
      </h2>
      <a href="/login">
        <Button type="primary">
          <Trans>Login</Trans>
        </Button>
      </a>
    </Modal>
  );
}
