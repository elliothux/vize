import * as React from 'react';

interface Props {
    content: string;
}

export function SVGRender({ content }: Props) {
    return <span className="svg-render" dangerouslySetInnerHTML={{ __html: content }} />;
}
