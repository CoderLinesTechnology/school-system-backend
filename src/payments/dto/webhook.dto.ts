import { IsString, IsEnum, IsInt } from 'class-validator';
import { PaymentStatus } from '../../entities/payment.entity';

export class WebhookDto {
  @IsString()
  transactionReference: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsInt({ optional: true })
  documentId?: number;
}