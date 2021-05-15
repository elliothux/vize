import { Editor, Element as SlateElement, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

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
