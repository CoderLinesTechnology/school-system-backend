import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { DocumentService } from '../document/document.service';
import { NotificationService } from '../notification/notification.service';
import { InitiatePaymentDto } from './dto/payment.dto';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    private documentService: DocumentService,
    private notificationService: NotificationService,
    private configService: ConfigService,
  ) {}

  async initiatePayment(initiatePaymentDto: InitiatePaymentDto) {
    const payment = this.paymentRepository.create({
      ...initiatePaymentDto,
      status: 'pending',
      reference: `REF-${Date.now()}`,
    });
    await this.paymentRepository.save(payment);
    return payment;
  }

  async getPaymentStatus(reference: string) {
    return this.paymentRepository.findOne({ where: { reference } });
  }

  async handleWebhook(webhookData: any) {
    const signature = crypto
      .createHmac('sha256', this.configService.get<string>('PAYMENT_API_KEY'))
      .update(JSON.stringify(webhookData))
      .digest('hex');

    if (signature !== webhookData.signature) {
      throw new Error('Invalid webhook signature');
    }

    const payment = await this.paymentRepository.findOne({ where: { reference: webhookData.reference } });
    if (payment && webhookData.status === 'success') {
      payment.status = 'completed';
      await this.paymentRepository.save(payment);
      await this.documentService.updateDocumentVisibility(payment.documentId, { visibility: true });
      await this.notificationService.sendNotification(
        payment.userId,
        `Payment ${payment.reference} completed successfully`,
      );
    }
    return { success: true };
  }
}