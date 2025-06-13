import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateAssessmentDto, CreateDocumentDto } from './dto/teacher.dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class TeacherService {
  constructor(private supabaseService: SupabaseService) {}

  async createAssessment(dto: CreateAssessmentDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('assessments')
      .insert({
        student_id: dto.studentId,
        subject_id: dto.subjectId,
        score: dto.grade,
        term: dto.term,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create assessment: ${error.message}`);
    }
    return data;
  }

  async getStudentAssessments(studentId: number) {
    const { data, error } = await this.supabaseService.getClient()
      .from('assessments')
      .select(`
        *,
        subject:subject_id(*)
      `)
      .eq('student_id', studentId);

    if (error) {
      throw new Error(`Failed to fetch assessments: ${error.message}`);
    }
    return data;
  }

  async uploadDocument(dto: CreateDocumentDto & { file: any; uploadedById: number }) {
    const { data, error } = await this.supabaseService.getClient()
      .from('documents')
      .insert({
        student_id: dto.studentId || null,
        class_id: dto.classId || null,
        type: dto.type,
        filename: dto.file.filename,
        file_url: dto.file.path,
        title: dto.file.originalname,
        uploaded_by_id: dto.uploadedById,
        visibility: dto.visibility,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to upload document: ${error.message}`);
    }
    return data;
  }

  async recordAttendance(dto: CreateAttendanceDto & { recordedById: number }) {
    const { data, error } = await this.supabaseService.getClient()
      .from('attendance')
      .insert({
        student_id: dto.studentId,
        date: dto.date,
        status: dto.status,
        recorded_by_id: dto.recordedById,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to record attendance: ${error.message}`);
    }
    return data;
  }
}