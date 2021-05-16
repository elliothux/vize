const info = {
  name: '富文本',
  desc: '通用富文本，支持图文混排',
  author: 'Aedron@github',
};

const dataForm = {
  content: {
    title: '',
    type: 'string',
    widget: 'richtext',
  },
};

const enableStyleGroup = {
  margin: true,
  padding: true,
  background: true,
};

export default {
  info,
  dataForm,
  enableStyleGroup,
};
