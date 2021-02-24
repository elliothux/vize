import {
  CGIMiddleware,
  CGIResponse,
  getUserService,
  MiddlewareRequestMethod,
} from '../../../dist/main';

export const user: CGIMiddleware = {
  apply: async (request, response) => {
    const name = request.cookies['vize_user_name'];
    if (!name) {
      response.send(CGIResponse.success());
      return;
    }

    const userService = getUserService();
    const result = await userService.getBizEntityByName(name);
    response.send(CGIResponse.success(result));
  },
  forRoutes: [{ path: '/cgi/user/my', method: MiddlewareRequestMethod.GET }],
};
