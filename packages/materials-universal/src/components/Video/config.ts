const info = {
  name: '视频',
  desc: '基础视频组件',
  author: 'Aedron@github',
};

const dataForm = {
  url: {
    title: '视频URL',
    type: 'string',
    default: '',
    required: true,
  },
  poster: {
    title: '封面图',
    type: 'string',
    'x-component': 'Image',
  },
  autoPlay: {
    title: '自动播放',
    description: '自动播放时视频默认静音',
    type: 'boolean',
    default: false,
  },
};

const enableStyleGroup = {
  size: true,
  transform: true,
  border: true,
  margin: true,
  padding: true,
  zIndex: true,
  position: true,
};

export default {
  info,
  dataForm,
  enableStyleGroup,
};
