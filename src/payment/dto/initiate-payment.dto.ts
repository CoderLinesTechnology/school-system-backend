import { IsString, IsNumber } from 'class-validator';

export class InitiatePaymentDto {
  @IsString()
  studentId: string;

  @IsNumber()
  amount: number;
}