import { Module } from '@nestjs/common';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';
import { SupabaseService } from '../common/supabase/supabase.service';

@Module({
  controllers: [ParentController],
  providers: [ParentService, SupabaseService],
})
export class ParentModule {}