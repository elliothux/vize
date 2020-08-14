import './index.scss';
import { createElement } from 'rax';

interface Props {
    data: {
        text: string;
    };
}

export default function Text({ data: { text = 'test' } }: Props) {
    return <p className="vize-materials-universal text">{text}</p>;
}
