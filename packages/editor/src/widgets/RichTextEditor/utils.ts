import { Descendant, Editor, Element as SlateElement, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { jsx } from 'slate-hyperscript';
import { ELEMENT_TAGS, INLINE_TAGS } from './types';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export function toggleBlock(editor: ReactEditor, format: string) {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type),
    split: true,
  });
  const newProperties: Partial<SlateElement & { type: string }> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
}

export function toggleMark(editor: ReactEditor, format: string) {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export function isBlockActive(editor: ReactEditor, format: string) {
  const [match] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === format,
  });

  return !!match;
}

export function isMarkActive(editor: ReactEditor, format: string) {
  const marks = Editor.marks(editor);
  return marks ? (marks as any)[format] === true : false;
}

export function deserialize(el: Node | Element): Descendant[] | string | null {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  const { nodeName } = el;
  let parent = el as any;

  if (nodeName === 'PRE' && el.childNodes[0] && el.childNodes[0].nodeName === 'CODE') {
    parent = el.childNodes[0];
  }
  const children = Array.from(parent.childNodes)
    .map(deserialize as any)
    .filter(i => !!i)
    .flat();

  if (nodeName === 'P' && !children.length) {
    return null;
  }

  if (nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  const e = ELEMENT_TAGS[nodeName as keyof typeof ELEMENT_TAGS];
  if (e) {
    const attrs = e(el as any);
    return jsx('element', attrs, children);
  }

  const i = INLINE_TAGS[nodeName as keyof typeof INLINE_TAGS];
  if (i) {
    const attrs = i();
    return children.map(child => jsx('text', attrs, child));
  }

  return children as Descendant[];
}
