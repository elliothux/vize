import 'antd-mobile/es/action-sheet/style/index';
import { ActionParams } from '@vize/types';
import { default as ActionSheet } from 'antd-mobile/es/action-sheet';
import { isUrl, open } from '../../lib/utils';

interface Data {
  title: string;
  desc: string;
  actions: { text: string; url: string }[];
}

export default function({ data: { title, desc, actions } }: ActionParams<Data>) {
  ActionSheet.showActionSheetWithOptions(
    {
      options: actions.map(i => i.text),
      title,
      message: desc,
    },
    index => {
      const { url } = actions[index];
      if (isUrl(url)) {
        return open(url, true);
      }
    },
  );
}
