import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { SupabaseModule } from '../supabase/supabase.module'; // Make sure you have this

@Module({
  imports: [SupabaseModule],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}