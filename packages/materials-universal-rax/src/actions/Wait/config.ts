const info = {
  name: '等待',
  desc: '等待指定时间，执行下一个动作',
  author: 'aedron@github',
};

const dataForm = {
  duration: {
    title: '等待时间（秒）',
    default: 1,
    type: 'number',
    required: true,
  },
};

export default {
  info,
  dataForm,
};
