import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';

@Injectable()
export class AssessmentsService {
  constructor(private supabaseService: SupabaseService) {}

  async createAssessment(dto: CreateAssessmentDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('assessments')
      .insert({
        student_id: dto.studentId,
        subject_id: dto.subjectId,
        score: dto.score,
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

  async getClassAssessments(classId: number) {
    const { data, error } = await this.supabaseService.getClient()
      .from('assessments')
      .select(`
        *,
        student:student_id(*),
        subject:subject_id(*)
      `)
      .eq('student_id', classId); // Adjust this query based on your schema

    if (error) {
      throw new Error(`Failed to fetch class assessments: ${error.message}`);
    }
    return data;
  }
}