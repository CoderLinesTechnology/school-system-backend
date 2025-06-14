import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { SupabaseService } from '../common/supabase/supabase.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, SupabaseService],
})
export class PaymentModule {}