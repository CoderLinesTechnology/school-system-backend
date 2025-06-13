import { IsString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { PaymentStatus } from '../../types/payment.types'; // Updated import

export class WebhookDto {
  @IsString()
  transactionReference: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsOptional()
  @IsInt()
  documentId?: number;
}