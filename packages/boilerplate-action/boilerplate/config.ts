const info = {
  name: '{{name}}',
  desc: '{{desc}}',
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
