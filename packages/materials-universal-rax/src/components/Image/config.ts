const info = {
  name: '图片',
  desc: '图片组件（支持热区）',
  author: 'aedron@github',
};

const dataForm = {
  src: {
    title: '图片',
    type: 'string',
    required: true,
    default:
      'https://img.alicdn.com/imgextra/i2/O1CN01D67Qry1Etp2nhDeZ8_!!6000000000410-2-tps-302-167.png',
  },
};

const enableStyleGroup = {
  size: true,
  transform: true,
  border: true,
  margin: {
    left: 'auto',
    right: 'auto',
  },
  padding: true,
  zIndex: true,
  position: true,
};

export default {
  info,
  dataForm,
  enableStyleGroup,
  hotArea: true
};
