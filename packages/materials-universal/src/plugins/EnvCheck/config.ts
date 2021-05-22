import { envMap } from './constances';

const info = {
  name: '环境检测',
  desc: '限制页面运行环境',
  author: 'Aedron@github',
};

const dataForm = {
  env: {
    title: '限制环境',
    type: 'string',
    enum: Object.entries(envMap).map(([value, label]) => ({
      label,
      value,
    })),
    'x-component': 'Select',
    default: 'mobile',
  },
  tooltip: {
    title: '提示语',
    type: 'string',
    default: '',
  },
  jumpURL: {
    title: '跳转URL',
    type: 'string',
    required: true,
    format: 'url',
  },
};

export default {
  info,
  dataForm,
  singleInstance: true,
};
