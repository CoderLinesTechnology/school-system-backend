import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class StudentService {
  constructor(private supabaseService: SupabaseService) {}

  async getProfile(userId: number) {
    const { data, error } = await this.supabaseService.getClient()
      .from('students')
      .select(`
        *,
        user:user_id(*),
        class:class_id(*)
      `)
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      throw new NotFoundException('Student not found');
    }
    return data;
  }

  async getDocuments(userId: number) {
    // First get the student record
    const { data: student } = await this.supabaseService.getClient()
      .from('students')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const { data, error } = await this.supabaseService.getClient()
      .from('documents')
      .select(`
        *,
        uploaded_by:uploaded_by_id(*)
      `)
      .eq('student_id', student.id)
      .eq('visibility', true);

    if (error) {
      throw new Error(`Failed to fetch documents: ${error.message}`);
    }
    return data;
  }

  async getAssessments(userId: number) {
    // First get the student record
    const { data: student } = await this.supabaseService.getClient()
      .from('students')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const { data, error } = await this.supabaseService.getClient()
      .from('assessments')
      .select(`
        *,
        subject:subject_id(*)
      `)
      .eq('student_id', student.id);

    if (error) {
      throw new Error(`Failed to fetch assessments: ${error.message}`);
    }
    return data;
  }

  async getPayments(userId: number) {
    // First get the student record
    const { data: student } = await this.supabaseService.getClient()
      .from('students')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const { data, error } = await this.supabaseService.getClient()
      .from('payments')
      .select('*')
      .eq('student_id', student.id);

    if (error) {
      throw new Error(`Failed to fetch payments: ${error.message}`);
    }
    return data;
  }
}