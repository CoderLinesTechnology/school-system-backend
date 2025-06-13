import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from '../entities/payment.entity';
import { Document } from '../entities/document.entity';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { WebhookDto } from './dto/webhook.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    @InjectRepository(Document) private documentRepository: Repository<Document>,
  ) {}

  async initiatePayment(dto: InitiatePaymentDto) {
    const payment = this.paymentRepository.create({
      student: { id: dto.studentId },
      amount: dto.amount,
      status: PaymentStatus.PENDING,
      transaction_reference: `TX-${Date.now()}`,
    });
    return this.paymentRepository.save(payment);
  }

  async getPaymentStatus(reference: string) {
    const payment = await this.paymentRepository.findOne({
      where: { transaction_reference: reference },
      relations: ['student'],
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async handleWebhook(dto: WebhookDto) {
    const payment = await this.paymentRepository.findOne({
      where: { transaction_reference: dto.transactionReference },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    payment.status = dto.status as PaymentStatus;
    await this.paymentRepository.save(payment);
    if (dto.status === PaymentStatus.COMPLETED && dto.documentId) {
      const document = await this.documentRepository.findOne({
        where: { id: dto.documentId },
      });
      if (document) {
        document.visibility = true;
        await this.documentRepository.save(document);
      }
    }
    return { success: true };
  }
}