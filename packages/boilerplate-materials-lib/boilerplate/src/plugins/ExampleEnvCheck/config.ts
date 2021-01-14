const info = {
  name: 'ExampleEnvCheck',
  desc: 'A simple plugin example',
  author: '{{author}}',
};

const dataForm = {
  tooltip: {
    title: 'Tip Words',
    type: 'string',
  },
  jumpURL: {
    title: 'Jump URL',
    type: 'string',
    required: true,
    'x-rules': 'url',
  },
};

export default {
  info,
  dataForm,
};
