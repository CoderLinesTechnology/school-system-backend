import { Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class AssessmentService {
  constructor(private supabaseService: SupabaseService) {}

  async createAssessment(dto: CreateAssessmentDto, user: User) {
    if (user.user_metadata.role !== 'teacher') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('assessments')
      .insert({
        student_id: dto.studentId,
        subject_id: dto.subjectId,
        score: dto.score,
        term: dto.term,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async getStudentAssessments(studentId: string, user: User) {
    if (!['student', 'teacher', 'school_admin', 'parent'].includes(user.user_metadata.role)) {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('assessments')
      .select('*')
      .eq('student_id', studentId);

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async getClassAssessments(classId: string, user: User) {
    if (!['teacher', 'school_admin'].includes(user.user_metadata.role)) {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('assessments')
      .select('*, students(class_id)')
      .eq('students.class_id', classId);

    if (error) throw new Error(error.message);

    return { success: true, data };
  }
}