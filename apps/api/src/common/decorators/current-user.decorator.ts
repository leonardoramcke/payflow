import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Decorator auxiliar: permite pegar o usuário logado direto num parâmetro
// do controller, ex: @CurrentUser() user, em vez de acessar request.user manualmente.
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);