import { generate as generator } from './generator';
import { Generator } from './types';

export default {
  info: {
    name: 'Pegasus',
    desc: '生成天马模块',
    author: '青扬(259691)',
  },
  generator,
} as Generator;
