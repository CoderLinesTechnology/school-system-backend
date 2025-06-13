import { Module } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { AssessmentsController } from './assessments.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  providers: [AssessmentsService, SupabaseService],
  controllers: [AssessmentsController],
})
export class AssessmentsModule {}