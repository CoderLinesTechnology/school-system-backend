import { IsString } from 'class-validator';

export class SendNotificationDto {
  @IsString()
  recipientId: string;

  @IsString()
  message: string;
}