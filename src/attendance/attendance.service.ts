import { Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { RecordAttendanceDto } from './dto/record-attendance.dto';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class AttendanceService {
  constructor(private supabaseService: SupabaseService) {}

  async recordAttendance(dto: RecordAttendanceDto, user: User) {
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

  async getStudentAttendance(studentId: string, user: User) {
    if (!['student', 'teacher', 'school_admin', 'parent'].includes(user.user_metadata.role)) {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('attendance')
      .select('*')
      .eq('student_id', studentId);

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async getClassAttendance(classId: string, user: User) {
    if (!['teacher', 'school_admin'].includes(user.user_metadata.role)) {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('attendance')
      .select('*, students(class_id)')
      .eq('students.class_id', classId);

    if (error) throw new Error(error.message);

    return { success: true, data };
  }
}