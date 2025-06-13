import { IsInt, IsNumber } from 'class-validator';

export class InitiatePaymentDto {
  @IsInt()
  studentId: number;

  @IsNumber()
  amount: number;
}