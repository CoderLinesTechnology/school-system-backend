import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendNotification(dto: SendNotificationDto) {
    await this.mailerService.sendMail({
      to: dto.email,
      subject: dto.subject,
      text: dto.message,
    });
    return { success: true, message: 'Notification sent' };
  }
}