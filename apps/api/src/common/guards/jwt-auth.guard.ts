import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Esse guard usa a JwtStrategy que já criamos no módulo auth.
// Qualquer controller/rota decorado com @UseGuards(JwtAuthGuard)
// vai exigir um header "Authorization: Bearer <token>" válido.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}