import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  providers: [AdminService, SupabaseService],
  controllers: [AdminController],
})
export class AdminModule {}