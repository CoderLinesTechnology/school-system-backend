import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from '../entities/payment.entity';
import { Document } from '../entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Document])],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}