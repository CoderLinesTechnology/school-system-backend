import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { SupabaseService } from '../common/supabase/supabase.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, SupabaseService],
})
export class NotificationModule {}