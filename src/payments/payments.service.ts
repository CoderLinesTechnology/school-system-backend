import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { PaymentStatus } from '../types/payment.types'; // Updated import
import { InitiatePaymentDto } from './dto/initiate-payment.dto';
import { WebhookDto } from './dto/webhook.dto';

@Injectable()
export class PaymentsService {
  constructor(private supabaseService: SupabaseService) {}

  async initiatePayment(dto: InitiatePaymentDto) {
    const transactionReference = `TX-${Date.now()}`;
    
    const { data, error } = await this.supabaseService.getClient()
      .from('payments')
      .insert({
        student_id: dto.studentId,
        amount: dto.amount,
        status: PaymentStatus.PENDING,
        transaction_reference: transactionReference,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to initiate payment: ${error.message}`);
    }
    return data;
  }

  async getPaymentStatus(reference: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('payments')
      .select('*, student:student_id(*)')
      .eq('transaction_reference', reference)
      .single();

    if (error || !data) {
      throw new NotFoundException('Payment not found');
    }
    return data;
  }

  async handleWebhook(dto: WebhookDto) {
    const { data: payment, error: fetchError } = await this.supabaseService.getClient()
      .from('payments')
      .select('*')
      .eq('transaction_reference', dto.transactionReference)
      .single();

    if (fetchError || !payment) {
      throw new NotFoundException('Payment not found');
    }

    // Update payment status
    const { error: updateError } = await this.supabaseService.getClient()
      .from('payments')
      .update({ status: dto.status })
      .eq('transaction_reference', dto.transactionReference);

    if (updateError) {
      throw new Error(`Failed to update payment: ${updateError.message}`);
    }

    // If payment completed and document specified, make document visible
    if (dto.status === PaymentStatus.COMPLETED && dto.documentId) {
      const { error: docError } = await this.supabaseService.getClient()
        .from('documents')
        .update({ visibility: true })
        .eq('id', dto.documentId);

      if (docError) {
        console.error('Failed to update document visibility:', docError.message);
      }
    }

    return { success: true };
  }
}