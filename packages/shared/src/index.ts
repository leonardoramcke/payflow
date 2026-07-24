// Aqui vamos colocar tipos e constantes usados tanto pelo backend quanto pelo frontend,
// por exemplo os enums de PaymentStatus e PaymentMethod (espelhando o schema.prisma),
// para evitar duplicação de código entre apps/api e apps/web.

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  PIX = 'PIX',
  CREDIT_CARD = 'CREDIT_CARD',
  BOLETO = 'BOLETO',
}
