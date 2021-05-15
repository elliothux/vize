import * as React from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { RichTextFormat } from './types';

export function Element({ attributes, children, element }: RenderElementProps) {
  switch ((element as any).type as RichTextFormat) {
    case RichTextFormat.block_quote:
      return <blockquote {...attributes}>{children}</blockquote>;
    case RichTextFormat.numbered_list:
      return <ol {...attributes}>{children}</ol>;
    case RichTextFormat.bulleted_list:
      return <ul {...attributes}>{children}</ul>;

    case RichTextFormat.h1:
      return <h1 {...attributes}>{children}</h1>;
    case RichTextFormat.h2:
      return <h2 {...attributes}>{children}</h2>;
    case RichTextFormat.h3:
      return <h3 {...attributes}>{children}</h3>;
    case RichTextFormat.h4:
      return <h4 {...attributes}>{children}</h4>;
    case RichTextFormat.h5:
      return <h5 {...attributes}>{children}</h5>;
    case RichTextFormat.h6:
      return <h6 {...attributes}>{children}</h6>;

    default:
      return <p {...attributes}>{children}</p>;
  }
}

export function renderElement(props: RenderElementProps) {
  return React.createElement(Element, props);
}

export function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  if ((leaf as any).bold) {
    children = <strong>{children}</strong>;
  }

  if ((leaf as any).code) {
    children = <code>{children}</code>;
  }

  if ((leaf as any).italic) {
    children = <em>{children}</em>;
  }

  if ((leaf as any).underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
}

export function renderLeaf(props: RenderLeafProps) {
  return React.createElement(Leaf, props);
}
