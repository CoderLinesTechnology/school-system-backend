import { Module } from '@nestjs/common';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { SupabaseService } from '../common/supabase/supabase.service';

@Module({
  controllers: [AssessmentController],
  providers: [AssessmentService, SupabaseService],
})
export class AssessmentModule {}