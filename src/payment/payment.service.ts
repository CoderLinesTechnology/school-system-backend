import { Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { ConfigService } from '@nestjs/config';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class PaymentService {
  constructor(
    private supabaseService: SupabaseService,
    private configService: ConfigService,
  ) {}

  async initiatePayment(dto: InitiatePaymentDto, user: User) {
    if (user.user_metadata.role !== 'school_admin') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const transactionReference = `TXN_${Date.now()}`;
    const { data, error } = await this.supabaseService.client
      .from('payments')
      .insert({
        student_id: dto.studentId,
        amount: dto.amount,
        status: 'pending',
        transaction_reference: transactionReference,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    // Simulate payment gateway call (e.g., MoMo)
    // In production, use actual payment API
    return {
      success: true,
      data: {
        payment: data,
        paymentUrl: `https://payment-gateway.com/pay/${transactionReference}`,
      },
    };
  }

  async getPaymentStatus(reference: string, user: User) {
    if (!['school_admin', 'student', 'parent'].includes(user.user_metadata.role)) {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('payments')
      .select('*')
      .eq('transaction_reference', reference)
      .single();

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async handleWebhook(payload: any) {
    // Validate webhook signature using PAYMENT_API_KEY
    const { transaction_reference, status } = payload;

    const { data, error } = await this.supabaseService.client
      .from('payments')
      .update({ status })
      .eq('transaction_reference', transaction_reference)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return { success: true, data };
  }
}