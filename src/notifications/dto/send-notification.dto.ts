import { IsEmail, IsString } from 'class-validator';

export class SendNotificationDto {
  @IsEmail()
  email: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;
}