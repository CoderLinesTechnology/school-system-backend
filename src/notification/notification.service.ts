import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
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

  async sendNotification(userId: string, message: string) {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_SERVICE_USER'),
      to: userId,
      subject: 'School System Notification',
      text: message,
    };
    await this.transporter.sendMail(mailOptions);
  }
}