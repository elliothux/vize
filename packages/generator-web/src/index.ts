import { generate as generator } from './generator';
import { Generator } from '@vize/types';

export default <Generator>{
  info: {
    name: 'Web',
    desc: '生成 Web 普通页面',
    author: 'aedron@github',
  },
  generator,
};
