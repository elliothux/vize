import { DynamicModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WorkspacePaths } from '@vize/types';

const managementUIRoutes = [
  '/',
  '/templates',
  '/pages',
  '/libs',
  '/biz',
  '/log',
  '/user',
];

export function getStaticModules({
  materialsPath,
  previewPath,
  publishPath,
  editorPath,
  managementUIPath,
  uploadFilesPath,
}: WorkspacePaths): DynamicModule[] {
  const managementUIStaticModules = managementUIRoutes.map(route =>
    ServeStaticModule.forRoot({
      serveRoot: route,
      rootPath: managementUIPath,
      exclude: [
        '/cgi/*',
        '/editor/*',
        '/materials/*',
        '/preview/*',
        '/p/*',
        '/resource/*',
      ],
    }),
  ) as DynamicModule[];

  const staticModules = [
    ServeStaticModule.forRoot({
      serveRoot: '/p',
      rootPath: publishPath,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/preview',
      rootPath: previewPath,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/editor',
      rootPath: editorPath,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/materials',
      rootPath: materialsPath,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/resource',
      rootPath: uploadFilesPath,
    }),
  ] as DynamicModule[];

  return [...managementUIStaticModules, ...staticModules];
}
