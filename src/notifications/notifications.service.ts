import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_SERVICE_USER'),
        pass: this.configService.get<string>('EMAIL_SERVICE_PASS'),
      },
    });
  }

  async sendNotification(dto: SendNotificationDto) {
    await this.transporter.sendMail({
      to: dto.email,
      subject: dto.subject,
      text: dto.message,
    });
    return { success: true, message: 'Notification sent' };
  }
}