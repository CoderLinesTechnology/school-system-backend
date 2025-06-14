import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { SupabaseService } from '../common/supabase/supabase.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, SupabaseService],
})
export class StudentModule {}