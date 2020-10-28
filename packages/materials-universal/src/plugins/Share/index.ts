interface Params {
  on: Function;
  cancel: Function;
}

export default function({ on }: Params) {
  on('share', () => {
    setTimeout(() => alert('share'), 1000);
  });

  return console.log('Share');
}
