import { Descendant, Editor, Element as SlateElement, Transforms, Range, BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { jsx } from 'slate-hyperscript';
import { isUrl } from 'utils';
import { ELEMENT_TAGS, INLINE_TAGS, RichTextFormat } from './types';
import { message } from 'antd';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export function toggleBlock(editor: ReactEditor | BaseEditor, format: string) {
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

export function toggleMark(editor: ReactEditor | BaseEditor, format: string) {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export function isBlockActive(editor: ReactEditor | BaseEditor, format: string) {
  const [match] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === format,
  });

  return !!match;
}

export function isMarkActive(editor: ReactEditor | BaseEditor, format: string) {
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
    return jsx('element', attrs, children) as any;
  }

  const i = INLINE_TAGS[nodeName as keyof typeof INLINE_TAGS];
  if (i) {
    const attrs = i();
    return children.map(child => jsx('text', attrs, child));
  }

  return children as Descendant[];
}

export function withLinks(editor: ReactEditor) {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element: any) => {
    return element.type === RichTextFormat.link ? true : isInline(element);
  };

  editor.insertText = (text: any) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
}

export function insertLink(editor: ReactEditor | BaseEditor, url: string) {
  if (!editor.selection) {
    return message.warn('未选中任何内容');
  }
  wrapLink(editor, url);
}

export function getLink(editor: ReactEditor | BaseEditor) {
  const [link] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === RichTextFormat.link,
  });
  return link;
}

export function isLinkActive(editor: ReactEditor | BaseEditor) {
  return !!getLink(editor);
}

export function unwrapLink(editor: ReactEditor | BaseEditor) {
  Transforms.unwrapNodes(editor, {
    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === RichTextFormat.link,
  });
}

function wrapLink(editor: ReactEditor | BaseEditor, url: string) {
  if (isLinkActive(editor)) {
    return unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: RichTextFormat.link,
    children: [{ text: url }],
    url,
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
}
