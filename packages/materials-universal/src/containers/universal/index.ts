import './index.scss';

interface Props {
  render: any;
}

export default function({ render }: Props) {
  // DO something before render
  render();
}
