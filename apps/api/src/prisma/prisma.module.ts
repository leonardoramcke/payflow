import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global() faz esse módulo ficar disponível em qualquer outro módulo
// sem precisar importar toda vez.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}