import { ActionParams } from '@vize/types';

export default function ScrollToTop({ data: { smooth } }: ActionParams) {
  const root = document.querySelector('#vize-main-entry');
  console.log({ root });
  return root.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : undefined });
}
