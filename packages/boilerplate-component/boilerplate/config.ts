const info = {
  name: '{{name}}',
  desc: '{{desc}}',
  author: '{{author}}',
};

const dataForm = {
  text: {
    title: 'Text Content',
    type: 'textarea',
    default: 'Hello vize!',
    required: true,
  },
};

const styleForm = {
  color: {
    title: 'Text Color',
    type: 'color',
    format: 'rgb',
    default: 'rgb(255,83,25)',
    required: true,
  },
};

export default {
  info,
  dataForm,
  styleForm,
};
