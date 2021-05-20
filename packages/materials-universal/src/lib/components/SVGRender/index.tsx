import * as React from 'react';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  content: string;
}

export function SVGRender({ content, className, ...props }: Props) {
  return <span {...props} className={`svg-render ${className || ''}`} dangerouslySetInnerHTML={{ __html: content }} />;
}
