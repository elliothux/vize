const info = {
  name: '页面浏览时长提示',
  desc: '',
  author: '',
};

const dataForm = {
  duration: {
    title: '时长（秒）',
    type: 'number',
    default: 5,
    require: true,
  },
};

export default {
  info,
  dataForm,
  emitEvents: [
    {
      eventName: 'browserDuration',
      displayName: '浏览指定时长',
    },
  ],
};
