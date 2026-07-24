import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Este service centraliza a conexão com o banco via Prisma.
// Vamos criar o prisma.module.ts na próxima etapa e importar isso
// em cada módulo que precisar acessar o banco (users, payments, etc).

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
