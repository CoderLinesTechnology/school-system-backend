import { IsString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { PaymentStatus } from '../../entities/payment.entity';

export class WebhookDto {
  @IsString()
  transactionReference: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsOptional()
  @IsInt()
  documentId?: number;
}