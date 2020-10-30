const info = {
  name: '分享配置',
  desc: '基础分享配置',
  author: 'aedron@github',
};

const dataForm = {
  title: {
    title: '分享标题',
    type: 'string',
    'x-props': {
      placeholder: '不填时为当前页面标题',
    },
  },
  desc: {
    title: '分享描述',
    type: 'string',
    'x-props': {
      placeholder: '不填时为当前页面描述',
    },
  },
  url: {
    title: '分享URL',
    type: 'string',
    'x-rules': 'url',
    'x-props': {
      placeholder: '不填时为当前页面URL',
    },
  },
  wording: {
    title: '分享完成提示语',
    type: 'string',
    default: '分享完成',
    'x-props': {
      placeholder: '不填时没有提示',
    },
  },
  jumpURL: {
    title: '分享完成跳转链接',
    type: 'string',
    'x-rules': 'url',
    'x-props': {
      placeholder: '不填时不跳转',
    },
  },
  icon: {
    title: '分享封面',
    type: 'image',
  },
};

export default {
  info,
  dataForm,
  emitEvents: [{ displayName: '分享成功', eventName: 'shareSuccess' }],
  onEvents: [{ displayName: '唤起分享', eventName: 'share' }],
};
