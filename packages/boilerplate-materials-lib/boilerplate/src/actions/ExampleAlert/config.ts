const info = {
  name: 'ExampleAlert',
  desc: 'A simple action example',
  author: '{{author}}',
};

const dataForm = {
  content: {
    title: 'Alert Content',
    type: 'string',
    default: 'Hello vize!',
    required: true,
  },
};

export default {
  info,
  dataForm,
};
