import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  providers: [StudentService, SupabaseService],
  controllers: [StudentController],
})
export class StudentModule {}