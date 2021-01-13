import './styles/index.scss';

export default function({ render, data: { exampleText } }: any) {
  // DO something before render
  console.log(exampleText);
  render();
}
