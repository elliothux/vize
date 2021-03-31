import { isDebugMode } from '../common';
import { parseDSLFromCGIRecord, parseDSLFromLocalStorage } from '../dsl';
import { getPage } from '../../api';
import { editStore } from '../../states';
import { message } from 'antd';
import { i18n } from '../../../../i18n';

export async function restoreState() {
  if (isDebugMode()) {
    const dslString = localStorage.getItem('dsl');
    if (!dslString) {
      return;
    }

    const dsl = parseDSLFromLocalStorage(JSON.parse(dslString));
    return restoreState(dsl);
  }

  const [success, result] = await getPage(editStore.pageKey);
  if (!success) {
    console.error(result);
    message.error(i18n.t('failed to get page data'));
    return;
  }

  const [dsl, owner] = parseDSLFromCGIRecord(result!);
  // return restoreState(dsl, { owner });
}
