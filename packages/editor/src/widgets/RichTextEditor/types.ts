export enum RichTextFormat {
  /**
   * @desc Inlines
   */
  bold = 'bold',
  italic = 'italic',
  underline = 'underline',
  code = 'code',
  link = 'link',
  /**
   * @desc Blocks
   */
  block_quote = 'block-quote',
  numbered_list = 'numbered-list',
  bulleted_list = 'bulleted-list',
  list_item = 'list-item',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

export const ELEMENT_TAGS = {
  A: (el: HTMLAnchorElement) => ({ type: RichTextFormat.link, url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: RichTextFormat.block_quote }),
  OL: () => ({ type: RichTextFormat.numbered_list }),
  UL: () => ({ type: RichTextFormat.bulleted_list }),
  LI: () => ({ type: RichTextFormat.list_item }),
  PRE: () => ({ type: RichTextFormat.code }),
  H1: () => ({ type: RichTextFormat.h1 }),
  H2: () => ({ type: RichTextFormat.h2 }),
  H3: () => ({ type: RichTextFormat.h3 }),
  H4: () => ({ type: RichTextFormat.h4 }),
  H5: () => ({ type: RichTextFormat.h5 }),
  H6: () => ({ type: RichTextFormat.h6 }),
  P: () => ({ type: 'paragraph' }),
};

export const INLINE_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};
