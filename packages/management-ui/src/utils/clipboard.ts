import { message } from 'antd';
import { i18n } from 'i18n';
import { PromiseResult, promiseWrapper } from './common';

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.zIndex = '-1';
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (e) {
    throw e;
  } finally {
    document.body.removeChild(textArea);
  }
}

export function copyToClipboard(text: string): PromiseResult<void> {
  if (!navigator.clipboard) {
    try {
      fallbackCopyTextToClipboard(text);
    } catch (e) {
      return Promise.resolve([e, null]);
    }
    return Promise.resolve([null, void null]);
  }
  return promiseWrapper(navigator.clipboard.writeText(text));
}

export async function copyToClipboardWithMessage(text: string) {
  const [err] = await copyToClipboard(text);
  if (err) {
    console.error(err);
    message.error(i18n.t('failed to copy to clipboard'));
  } else {
    message.success(i18n.t('copied'));
  }
}
