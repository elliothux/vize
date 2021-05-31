import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Maybe } from '@vize/types';

export const UserName = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Maybe<string> => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies['vize_user_name'];
  },
);
