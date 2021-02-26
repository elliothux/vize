import * as path from 'path';
import {
  CGIMiddleware,
  getUserService,
  MiddlewareRequestMethod,
} from '../../../dist/main';

export const login: CGIMiddleware[] = [
  {
    apply: async (_request, response) => {
      const userService = getUserService();
      if (!(await userService.checkUserExists('tourist'))) {
        await userService.createUserEntity({
          name: 'tourist',
          isAdmin: 1,
          bizs: [],
        });
      }
      response.cookie('vize_user_name', 'tourist');
      response.sendFile(path.resolve(__dirname, '../../public/login.html'));
    },
    forRoutes: [{ path: '/login', method: MiddlewareRequestMethod.ALL }],
  },
  {
    apply: async (_request, response) => {
      response.cookie('vize_user_name', '', { maxAge: 0 });
      response.sendFile(path.resolve(__dirname, '../../public/logout.html'));
    },
    forRoutes: [{ path: '/logout', method: MiddlewareRequestMethod.ALL }],
  },
];
