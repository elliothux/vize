import * as React from 'react';
import './index.scss';

interface Props {
    data: {
        text: string;
    };
}

export default function Button({ data: { text } }: Props) {
    return <button className="vize-materials-universal button">{text}</button>;
}
