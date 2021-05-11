const info = {
  name: '轮播图',
  desc: '图片轮播组件',
  author: 'Aedron@github',
};

const dataForm = {
  images: {
    title: '图片',
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
