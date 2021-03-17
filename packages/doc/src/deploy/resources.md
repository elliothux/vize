---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 静态资源管理

Vize 提供简单的静态文件管理服务，这些静态文件被保存在 `workspace` 目录，与整个系统站点共用同一个静态资源服务。

同时 Vize 提供便捷的静态资源接口，以满足定制化需求（如发布静态资源到 CDN 等）。

## 1. 上传

通过注册上传回调，可以实现自定义上传逻辑。

修改服务项目目录下的 `src/config.ts`，在 `config` 内新增 **`resources`** 字段：

```ts {12-14,18-20}
import { UploadResourceCallback } from '@vize/cgi';

const onUpload: UploadResourceCallback = async ({
  path,
  fieldname,
  originalname,
  encoding,
  mimetype,
  buffer,
  size,
}) => {
  // 自定义上传逻辑
  const url = await myUpload(path, originalname);
  return { url };
};

export const config = {
  resources: {
    onUpload,
  },
};
```

## 2. 删除

与上传类似，通过注册回调，可以实现自定义删除资源的逻辑。

修改服务项目目录下的 `src/config.ts`，在 `config.resources` 内新增 **`onDelete`** 回调：

```ts {4,5,9-11}
import { DeleteResourceCallback } from '@vize/cgi';

const onDelete: DeleteResourceCallback = async ({ url, type, extension, filename, createdTime }) => {
  // 自定义删除逻辑
  await myDelete(url);
};

export const config = {
  resources: {
    onDelete,
  },
};
```
