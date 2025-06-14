import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { SupabaseService } from '../common/supabase/supabase.service';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService, SupabaseService],
})
export class AttendanceModule {}