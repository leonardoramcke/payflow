import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, dto: CreatePaymentDto) {
    // Garante que o cliente pertence ao mesmo tenant do usuário logado
    const customer = await this.prisma.customer.findFirst({
      where: { id: dto.customerId, tenantId },
    });

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado para este tenant.');
    }

    const payment = await this.prisma.payment.create({
      data: {
        tenantId,
        customerId: dto.customerId,
        amountCents: dto.amountCents,
        method: dto.method,
        description: dto.description,
        status: 'PENDING',
      },
    });

    await this.prisma.transaction.create({
      data: {
        paymentId: payment.id,
        status: 'PENDING',
        note: 'Cobrança criada, aguardando processamento.',
      },
    });

    // Dispara o "processamento assíncrono simulado" sem bloquear a resposta HTTP
    this.simulateProcessing(payment.id);

    return payment;
  }

  findAll(tenantId: string) {
    return this.prisma.payment.findMany({
      where: { tenantId },
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const payment = await this.prisma.payment.findFirst({
      where: { id, tenantId },
      include: { customer: true, transactions: { orderBy: { createdAt: 'asc' } } },
    });

    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado.');
    }

    return payment;
  }

  // Simula um gateway de pagamento: espera um pouco, muda para PROCESSING,
  // espera mais um pouco, e decide entre PAID ou FAILED (90% de chance de sucesso).
  private simulateProcessing(paymentId: string) {
    setTimeout(async () => {
      await this.updateStatus(paymentId, 'PROCESSING', 'Processando pagamento...');

      setTimeout(async () => {
        const success = Math.random() < 0.9;
        const finalStatus = success ? 'PAID' : 'FAILED';
        const note = success
          ? 'Pagamento aprovado.'
          : 'Pagamento recusado pela operadora (simulado).';

        await this.updateStatus(paymentId, finalStatus, note);
      }, 4000);
    }, 2000);
  }

  private async updateStatus(paymentId: string, status: string, note: string) {
    try {
      await this.prisma.payment.update({
        where: { id: paymentId },
        data: { status },
      });

      await this.prisma.transaction.create({
        data: { paymentId, status, note },
      });

      this.logger.log(`Payment ${paymentId} -> ${status}`);
    } catch (error) {
      this.logger.error(`Falha ao atualizar payment ${paymentId}`, error as Error);
    }
  }
}