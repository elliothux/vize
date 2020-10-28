interface Params {
  on: Function;
  cancel: Function;
}

export default function({ on }: Params) {
  on('share', () => {
    setTimeout(() => alert('share'), 1000);
  });

  console.log('start exec test plugin');
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('exec test plugin done');
      resolve();
    }, 5000);
  });
}
