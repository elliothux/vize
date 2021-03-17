import * as path from 'path';
import {
  CGIMiddleware,
  CGIResponse,
  getUserService,
  MiddlewareRequestMethod,
} from '../../../dist/main';

export const user: CGIMiddleware[] = [
  {
    apply: async (_request, response) => {
      const userService = getUserService();
      if (!(await userService.checkUserExists('tourist'))) {
        await userService.createUserEntity({
          name: 'tourist',
          isAdmin: 1,
          avatar: '',
          bizs: [],
          extInfo: JSON.stringify({}),
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
  {
    apply: async (request, response) => {
      const name = request.cookies['vize_user_name'];
      if (!name) {
        response.send(CGIResponse.success());
        return;
      }

      const userService = getUserService();
      const result = await userService.getUserEntityByName(name);
      response.send(CGIResponse.success(result));
    },
    forRoutes: [{ path: '/user-info', method: MiddlewareRequestMethod.GET }],
  },
];
