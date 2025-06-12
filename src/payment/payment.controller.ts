import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InitiatePaymentDto } from './dto/payment.dto';

@Controller('api/payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
  async initiatePayment(@Body() initiatePaymentDto: InitiatePaymentDto) {
    return this.paymentService.initiatePayment(initiatePaymentDto);
  }

  @Get('status/:reference')
  async getPaymentStatus(@Param('reference') reference: string) {
    return this.paymentService.getPaymentStatus(reference);
  }

  @Post('webhook')
  async handleWebhook(@Body() webhookData: any) {
    return this.paymentService.handleWebhook(webhookData);
  }
}