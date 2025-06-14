import { Module } from '@nestjs/common';
import { SchoolAdminController } from './school-admin.controller';
import { SchoolAdminService } from './school-admin.service';
import { SupabaseService } from '../common/supabase/supabase.service';

@Module({
  controllers: [SchoolAdminController],
  providers: [SchoolAdminService, SupabaseService],
})
export class SchoolAdminModule {}