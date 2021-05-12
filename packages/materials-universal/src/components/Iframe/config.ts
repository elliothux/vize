const info = {
  name: '内嵌页',
  desc: 'iframe 组件，用于内嵌其他页面',
  author: 'Aedron@github',
};

const dataForm = {
  url: {
    title: 'URL',
    type: 'string',
    required: true,
  },
  title: {
    title: 'title',
    type: 'string',
    required: true,
    default: 'iframe page',
  },
};

const enableStyleGroup = {
  border: true,
  margin: true,
  padding: true,
};

export default {
  info,
  dataForm,
  enableStyleGroup,
};
