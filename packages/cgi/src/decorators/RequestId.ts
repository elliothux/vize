import { createParamDecorator } from '@nestjs/common';
import { v4 } from 'uuid';

export const RequestId = createParamDecorator((): string => v4());
