import { Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class TeacherService {
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
    if (user.user_metadata.role !== 'teacher') {
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

  async uploadDocument(dto: { studentId: string; classId: string; type: string; filename: string }, user: User) {
    if (user.user_metadata.role !== 'teacher') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('documents')
      .insert({
        student_id: dto.studentId,
        class_id: dto.classId,
        type: dto.type,
        filename: dto.filename,
        uploaded_by: user.id,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async recordAttendance(dto: CreateAttendanceDto, user: User) {
    if (user.user_metadata.role !== 'teacher') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('attendance')
      .insert({
        student_id: dto.studentId,
        date: dto.date,
        status: dto.status,
        recorded_by: user.id,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return { success: true, data };
  }
}