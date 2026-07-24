import { IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

const PAYMENT_METHODS = ['PIX', 'CREDIT_CARD', 'BOLETO'];

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  customerId!: string;

  @IsInt()
  @IsPositive()
  amountCents!: number;

  @IsIn(PAYMENT_METHODS)
  method!: string;

  @IsOptional()
  @IsString()
  description?: string;
}