import './index.scss';
import * as React from 'react';
import { useEffect } from 'react';
import { Button, Modal } from 'antd';
import { useUser } from 'hooks';
import { Trans } from 'react-i18next';
import { editStore } from 'states';
import LOGO from 'static/images/logo.svg';

export function Login() {
  const [success, user] = useUser();

  useEffect(() => {
    if (user) {
      editStore.setState(store => {
        store.user = user;
      }, true);
    }
  }, [user]);

  if (!success || user) {
    return null;
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
