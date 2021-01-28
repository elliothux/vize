const info = {
  name: '弹窗',
  desc: '通用弹窗容器',
  author: 'aedron@github',
};

const enableStyleGroup = {
  background: { color: 'rgba(0, 0, 0, 0.6)' },
  padding: 24,
};

export default {
  info,
  enableStyleGroup,
  isContainer: true,
  // hideEditMask: true,
  onEvents: [
    { displayName: '显示弹窗', eventName: 'show' },
    { displayName: '隐藏弹窗', eventName: 'hide' },
    { displayName: '切换显隐', eventName: 'toggle' },
  ],
};
