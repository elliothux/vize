/* eslint-disable max-lines */
import * as path from 'path';
import { DSL } from '../types';
import { generate } from '../src';

const dsl = {
  pageKey: 'test',
  container: { lib: 'universal', name: 'universal' },
  global: {
    globalProps: {},
    globalStyle: {
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      border: { type: 'none', color: '#161616', width: 1 },
      background: { color: '#ffffff', image: '', size: 'auto', position: 'center top', repeat: 'repeat-y' },
    },
    metaInfo: { title: 'vize page', desc: '', duration: null, expiredJump: '' },
  },
  pageInstances: [
    {
      key: 1,
      name: 'index',
      path: '1',
      isHome: true,
      componentInstances: [
        {
          key: 1,
          component: 'universal_button',
          lib: 'universal',
          data: { text: '按钮' },
          style: {},
          commonStyle: {
            size: { autoWidth: true, width: 200, autoHeight: true, height: 80 },
            transform: { rotate: 0, opacity: 1, scale: 1, radius: 0 },
            text: { color: '#161616', fontSize: 14, lineHeight: 20, textAlign: 'center', weight: 'normal' },
            border: { type: 'none', color: '#161616', width: 1 },
            background: { color: 'transparent', image: '', size: 'auto', position: 'center top', repeat: 'repeat-y' },
            margin: { top: 12, left: 0, bottom: 12, right: 0 },
            padding: { top: 0, left: 8, bottom: 0, right: 8 },
            zIndex: true,
            position: true,
          },
          wrapperStyle: {
            background: { color: 'transparent', image: '', size: 'auto', position: 'center top', repeat: 'repeat-y' },
          },
          events: [],
          shared: false,
        },
      ],
    },
    {
      key: 2,
      name: 'new page',
      path: '2',
      isHome: false,
      componentInstances: [
        {
          key: 2,
          component: 'universal_container',
          lib: 'universal',
          data: {},
          style: {},
          commonStyle: {
            size: { autoWidth: true, width: 200, autoHeight: true, height: 80 },
            transform: { rotate: 0, opacity: 1, scale: 1, radius: 0 },
            text: { color: '#161616', fontSize: 14, lineHeight: 20, textAlign: 'center', weight: 'normal' },
            border: { type: 'none', color: '#161616', width: 1 },
            background: { color: 'transparent', image: '', size: 'auto', position: 'center top', repeat: 'repeat-y' },
            margin: { top: 0, left: 'auto', bottom: 0, right: 'auto' },
            padding: { top: 0, left: 0, bottom: 0, right: 0 },
            zIndex: true,
            position: true,
          },
          wrapperStyle: {},
          events: [],
          shared: false,
          children: [
            {
              key: 5,
              component: 'universal_image',
              lib: 'universal',
              data: { src: 'https://img.alicdn.com/tfs/TB1PibhR4D1gK0jSZFsXXbldVXa-512-416.png' },
              style: {},
              commonStyle: {
                size: { autoWidth: true, width: 200, autoHeight: true, height: 80 },
                transform: { rotate: 0, opacity: 1, scale: 1, radius: 0 },
                border: { type: 'none', color: '#161616', width: 1 },
                margin: { top: 0, left: 'auto', bottom: 0, right: 'auto' },
                padding: { top: 0, left: 0, bottom: 0, right: 0 },
                zIndex: true,
                position: true,
              },
              wrapperStyle: {
                background: {
                  color: 'transparent',
                  image: '',
                  size: 'auto',
                  position: 'center top',
                  repeat: 'repeat-y',
                },
              },
              events: [],
              hotAreas: [],
              shared: false,
            },
          ],
        },
      ],
    },
  ],
  pluginInstances: [],
  sharedComponentInstance: [
    {
      key: 3,
      component: 'universal_text',
      lib: 'universal',
      data: { text: '输入文本内容...' },
      style: {},
      commonStyle: {
        size: { autoWidth: true, width: 200, autoHeight: true, height: 80 },
        transform: { rotate: 0, opacity: 1, scale: 1, radius: 0 },
        text: { color: '#161616', fontSize: 14, lineHeight: 20, textAlign: 'center', weight: 'normal' },
        border: { type: 'none', color: '#161616', width: 1 },
        background: { color: 'transparent', image: '', size: 'auto', position: 'center top', repeat: 'repeat-y' },
        margin: { top: 12, left: 0, bottom: 12, right: 0 },
        padding: { top: 0, left: 8, bottom: 0, right: 8 },
        zIndex: true,
        position: true,
      },
      wrapperStyle: {},
      events: [],
      shared: true,
    },
  ],
  editInfo: {
    layoutMode: 'stream',
    pageMode: 'single',
    maxKeys: { page: 2, component: 5, 'hot-area': 1, plugin: 1, action: 1 },
  },
} as DSL;

// const generator = new WebPageGenerator({
//   dsl,
//   libsPath: path.resolve(__dirname, './libs'),
//   depsPath: path.resolve(__dirname, './deps'),
//   targetPath: path.resolve(__dirname, './dist'),
//   useSWC: false,
// });

const generator = generate({
  dsl,
  libsPath: path.resolve(__dirname, './libs'),
  depsPath: path.resolve(__dirname, './deps'),
  distWorkspacePath: path.resolve(__dirname, './dist'),
}).then(console.log);
