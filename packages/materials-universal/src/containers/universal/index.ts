import './index.scss';

export default function({ render, data, on, emit }: any) {
  // DO something before render
  // implementRouterController(Router);
  // console.log('container data: ', data);
  render();

  on('test', () => {
    alert('render');
  });

  setTimeout(() => {
    emit('test');
  }, 1000);
}
