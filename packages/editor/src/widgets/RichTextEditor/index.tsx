/**
 * TODO: refactor
 */
import './index.scss';
import React, { useCallback, useEffect, useMemo, useState, MutableRefObject, useRef } from 'react';
import { Editable, withReact, Slate, ReactEditor, useSlate } from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdCode,
  MdFormatQuote,
  MdLooksOne,
  MdLooksTwo,
  MdLooks3,
  MdLooks4,
  MdLooks5,
  MdLooks6,
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdLink,
} from 'react-icons/md';
import { renderElement, renderLeaf } from './Element';
import { MarkButton, BlockButton } from './Components';
import { WithFrame } from 'widgets/WithFrame';
import { deserialize, getLink, insertLink, isLinkActive, unwrapLink, withLinks } from './utils';
import style from './index.iframe.scss';
import { RichTextFormat } from './types';
import { useTranslation } from 'react-i18next';
import { isString, noop } from '../../utils';
import { Popover } from 'antd';

interface Props {
  initValue: string;
  editorRef: MutableRefObject<ReactEditor | undefined>;
  getNodeRef: MutableRefObject<(() => HTMLDivElement) | undefined>;
}

const defaultInitValue = [
  {
    children: [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      } as Descendant,
    ],
  } as Descendant,
];

function getInitValue(initValue: string) {
  if (!initValue) {
    return defaultInitValue;
  }

  const { body } = new DOMParser().parseFromString(initValue, 'text/html');
  const value = deserialize(body!);
  return value as Descendant[];
}

export function RichTextEditor({ initValue, editorRef, getNodeRef }: Props) {
  const getValue = useCallback(() => getInitValue(initValue), [initValue]);
  const [value, setValue] = useState<Descendant[]>(getValue);
  const editor = useMemo<ReactEditor>(() => withLinks(withHistory(withReact(createEditor() as ReactEditor))), []);

  const documentRef = useRef<Document>(null);
  useEffect(() => {
    getNodeRef.current = () => documentRef.current?.querySelector('.vize-richtext-editable') as HTMLDivElement;
  }, [documentRef.current]);

  useEffect(() => {
    editorRef.current = editor;
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <ToolBar />
      <hr className="vize-richtext-hr" />
      <WithFrame documentRef={documentRef}>
        <style type="text/css">{style}</style>
        <Editable
          className="vize-richtext-editable"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Input some text…"
          spellCheck
          autoFocus
        />
      </WithFrame>
    </Slate>
  );
}

function ToolBar() {
  const { t } = useTranslation();

  return (
    <div className="vize-richtext-toolbar">
      <MarkButton format={RichTextFormat.bold} icon={MdFormatBold} desc={t('bold')} />
      <MarkButton format={RichTextFormat.italic} icon={MdFormatItalic} desc={t('italic')} />
      <MarkButton format={RichTextFormat.underline} icon={MdFormatUnderlined} desc={t('underline')} />
      <MarkButton format={RichTextFormat.code} icon={MdCode} desc={t('code')} />
      <LinkButton />

      <span className="vize-richtext-toolbar-split-line" />

      <BlockButton format={RichTextFormat.block_quote} icon={MdFormatQuote} desc={t('quote')} />
      <BlockButton format={RichTextFormat.numbered_list} icon={MdFormatListNumbered} desc={t('numbered list')} />
      <BlockButton format={RichTextFormat.bulleted_list} icon={MdFormatListBulleted} desc={t('unnumbered list')} />

      <span className="vize-richtext-toolbar-split-line" />

      <BlockButton format={RichTextFormat.h1} icon={MdLooksOne} desc="h1" />
      <BlockButton format={RichTextFormat.h2} icon={MdLooksTwo} desc="h2" />
      <BlockButton format={RichTextFormat.h3} icon={MdLooks3} desc="h3" />
      <BlockButton format={RichTextFormat.h4} icon={MdLooks4} desc="h4" />
      <BlockButton format={RichTextFormat.h5} icon={MdLooks5} desc="h5" />
      <BlockButton format={RichTextFormat.h6} icon={MdLooks6} desc="h6" />
    </div>
  );
}

function LinkButton() {
  const editor = useSlate();
  const { t } = useTranslation();

  const link = getLink(editor);
  const onInsertLink = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();

      const url = window.prompt(t('Enter the URL of the link') + ' :', (link?.[0] as any)?.url || '');
      if (!isString(url)) {
        return;
      }

      if (!url) {
        if (link) {
          return unwrapLink(editor);
        }
        return;
      }
      return insertLink(editor, url);
    },
    [!!link],
  );

  return (
    <MarkButton format={RichTextFormat.link} icon={MdLink} desc={t('link')} onClick={onInsertLink} activated={!!link} />
  );
}
