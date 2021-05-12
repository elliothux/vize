const info = {
  name: '轮播图',
  desc: '图片轮播组件',
  author: 'Aedron@github',
};

const dataForm = {
  autoplay: {
    title: '自动切换',
    type: 'boolean',
    default: true,
  },
  vertical: {
    title: '垂直切换',
    type: 'boolean',
    default: false,
  },
  interval: {
    title: '切换时间间隔',
    type: 'number',
    widget: 'slider',
    default: 2,
    min: 1,
    max: 60,
  },
  images: {
    title: '轮播图片',
    type: 'array',
    required: true,
    items: {
      type: 'object',
      properties: {
        image: {
          title: '图片',
          type: 'string',
          widget: 'image',
          required: true,
          default: 'https://img.alicdn.com/tfs/TB1PibhR4D1gK0jSZFsXXbldVXa-512-416.png',
        },
        link: {
          title: '跳转链接',
          type: 'string',
        },
      },
    },
  },
};

const enableStyleGroup = {
  transform: true,
  border: true,
  margin: true,
  padding: true,
  zIndex: true,
};

export default {
  info,
  dataForm,
  enableStyleGroup,
};
