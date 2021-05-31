import * as React from 'react';
import { memo, useCallback, useState } from 'react';
import { Button, message, Modal, PageHeader, Spin, Result } from 'antd';
import { UserRecord, Maybe } from 'types';
import { useTranslation, Trans } from 'react-i18next';
import { generateDeveloperAccessToken } from '../../api';
import { copyToClipboardWithMessage } from '../../utils';

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
  user: Maybe<UserRecord>;
}

function IGenerateAccessToken({ user, visible, setVisible }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const onBack = useCallback(() => {
    setVisible(false);
    setToken('');
  }, []);

  const onGenerate = useCallback(async () => {
    setLoading(true);
    const [success, result, response] = await generateDeveloperAccessToken(user!.id);
    setLoading(false);

    if (!success || !result?.token) {
      message.error(t('Failed to generate access token'));
      console.error(response);
      return;
    }

    setToken(result.token);
  }, [user]);

  const onCopyToken = useCallback(() => {
    return copyToClipboardWithMessage(token);
  }, [token]);

  if (!user) {
    return null;
  }

  return (
    <Modal
      className="generate-access-token"
      title=""
      visible={visible}
      onCancel={onBack}
      footer={null}
      closeIcon={<span />}
      destroyOnClose
      closable
    >
      <Spin spinning={loading}>
        <PageHeader onBack={onBack} title={t('Generate Developer Access Token')} subTitle="" />

        {token ? (
          <Result
            status="success"
            title={t('Success')}
            subTitle={t("Make sure to copy this access token now. You won't be able to see it again!")}
            extra={
              <>
                <p className="access-token">Access Token: {token}</p>
                <Button type="primary" onClick={onCopyToken}>
                  <Trans>Copy</Trans>
                </Button>
              </>
            }
          />
        ) : (
          <Result
            status="warning"
            title={t('Warning')}
            subTitle={t("Once generated, this user's old Access Token will be discarded, continue?")}
            extra={
              <Button type="primary" onClick={onGenerate}>
                <Trans>Generate</Trans>
              </Button>
            }
          />
        )}
      </Spin>
    </Modal>
  );
}

export const GenerateAccessToken = memo(IGenerateAccessToken);
