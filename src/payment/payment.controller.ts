import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/payments')
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('initiate')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['school_admin'])
  async initiatePayment(@Body() dto: InitiatePaymentDto, @Request() req) {
    return this.paymentService.initiatePayment(dto, req.user);
  }

  @Get('status/:reference')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['school_admin', 'student', 'parent'])
  async getPaymentStatus(@Param('reference') reference: string, @Request() req) {
    return this.paymentService.getPaymentStatus(reference, req.user);
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: any) {
    return this.paymentService.handleWebhook(payload);
  }
}