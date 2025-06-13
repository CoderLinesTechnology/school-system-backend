import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private supabaseService: SupabaseService) {}

  async recordAttendance(dto: CreateAttendanceDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('attendance')
      .insert({
        student_id: dto.studentId,
        class_id: dto.classId,
        date: dto.date,
        status: dto.status,
        recorded_by_id: dto.recordedById,
        remarks: dto.remarks,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to record attendance: ${error.message}`);
    }
    return data;
  }

  async getStudentAttendance(studentId: number) {
    const { data, error } = await this.supabaseService.getClient()
      .from('attendance')
      .select('*, recorded_by:recorded_by_id(*), class:class_id(*)')
      .eq('student_id', studentId);

    if (error) {
      throw new Error(`Failed to fetch attendance: ${error.message}`);
    }
    return data;
  }

  async getClassAttendance(classId: number) {
    const { data, error } = await this.supabaseService.getClient()
      .from('attendance')
      .select('*, student:student_id(*), recorded_by:recorded_by_id(*)')
      .eq('class_id', classId);

    if (error) {
      throw new Error(`Failed to fetch class attendance: ${error.message}`);
    }
    return data;
  }
}