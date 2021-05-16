import './index.scss';
import React, { useCallback, useEffect, useMemo, useState, MutableRefObject, useRef } from 'react';
import { Editable, withReact, Slate, ReactEditor } from 'slate-react';
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
} from 'react-icons/md';
import { renderElement, renderLeaf } from './Element';
import { MarkButton, BlockButton } from './Components';
import { WithFrame } from 'widgets/WithFrame';
import { deserialize } from './utils';
import style from './index.iframe.scss';

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
        children: [{ text: 'A line of text in a paragraph.' }],
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
  const editor = useMemo<ReactEditor>(() => withHistory(withReact(createEditor() as ReactEditor)), []);

  const documentRef = useRef<Document>(null);
  useEffect(() => {
    getNodeRef.current = () => documentRef.current?.querySelector('.vize-richtext-editable') as HTMLDivElement;
  }, [documentRef.current]);

  useEffect(() => {
    editorRef.current = editor;
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <ToolBar editor={editor} />
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

interface ToolBarProps {
  editor: ReactEditor;
}

function ToolBar({ editor }: ToolBarProps) {
  return (
    <div className="vize-richtext-toolbar">
      <MarkButton editor={editor} format="bold" icon={MdFormatBold} />
      <MarkButton editor={editor} format="italic" icon={MdFormatItalic} />
      <MarkButton editor={editor} format="underline" icon={MdFormatUnderlined} />
      <MarkButton editor={editor} format="code" icon={MdCode} />

      <span className="vize-richtext-toolbar-split-line" />

      <BlockButton editor={editor} format="block-quote" icon={MdFormatQuote} />
      <BlockButton editor={editor} format="numbered-list" icon={MdFormatListNumbered} />
      <BlockButton editor={editor} format="bulleted-list" icon={MdFormatListBulleted} />

      <span className="vize-richtext-toolbar-split-line" />

      <BlockButton editor={editor} format="heading-1" icon={MdLooksOne} />
      <BlockButton editor={editor} format="heading-2" icon={MdLooksTwo} />
      <BlockButton editor={editor} format="heading-3" icon={MdLooks3} />
      <BlockButton editor={editor} format="heading-4" icon={MdLooks4} />
      <BlockButton editor={editor} format="heading-5" icon={MdLooks5} />
      <BlockButton editor={editor} format="heading-6" icon={MdLooks6} />
    </div>
  );
}
