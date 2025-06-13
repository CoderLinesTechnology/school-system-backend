import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ParentService {
  constructor(private supabaseService: SupabaseService) {}

  async getProfile(parentId: number) {
    const { data, error } = await this.supabaseService.getClient()
      .from('parents')
      .select('*, user:user_id(*)')
      .eq('user_id', parentId)
      .single();

    if (error || !data) {
      throw new NotFoundException('Parent not found');
    }
    return data;
  }

  async getChildren(parentId: number) {
    const { data, error } = await this.supabaseService.getClient()
      .from('parent_students')
      .select(`
        student:student_id(
          *,
          user:user_id(*),
          class:class_id(*)
        )
      `)
      .eq('parent_id', parentId);

    if (error) {
      throw new Error(`Failed to fetch children: ${error.message}`);
    }
    return data?.map(ps => ps.student) || [];
  }

  async getChildAssessments(studentId: number, parentId: number) {
    // First verify parent-student relationship
    const { data: parentStudent, error: relationError } = await this.supabaseService.getClient()
      .from('parent_students')
      .select('id')
      .eq('parent_id', parentId)
      .eq('student_id', studentId)
      .single();

    if (relationError || !parentStudent) {
      throw new NotFoundException('Student not linked to parent');
    }

    const { data, error } = await this.supabaseService.getClient()
      .from('assessments')
      .select('*, subject:subject_id(*)')
      .eq('student_id', studentId);

    if (error) {
      throw new Error(`Failed to fetch assessments: ${error.message}`);
    }
    return data;
  }

  async getChildDocuments(studentId: number, parentId: number) {
    // First verify parent-student relationship
    const { data: parentStudent, error: relationError } = await this.supabaseService.getClient()
      .from('parent_students')
      .select('id')
      .eq('parent_id', parentId)
      .eq('student_id', studentId)
      .single();

    if (relationError || !parentStudent) {
      throw new NotFoundException('Student not linked to parent');
    }

    const { data, error } = await this.supabaseService.getClient()
      .from('documents')
      .select('*, uploaded_by:uploaded_by_id(*)')
      .eq('student_id', studentId)
      .eq('visibility', true);

    if (error) {
      throw new Error(`Failed to fetch documents: ${error.message}`);
    }
    return data;
  }

  async getChildPayments(studentId: number, parentId: number) {
    // First verify parent-student relationship
    const { data: parentStudent, error: relationError } = await this.supabaseService.getClient()
      .from('parent_students')
      .select('id')
      .eq('parent_id', parentId)
      .eq('student_id', studentId)
      .single();

    if (relationError || !parentStudent) {
      throw new NotFoundException('Student not linked to parent');
    }

    const { data, error } = await this.supabaseService.getClient()
      .from('payments')
      .select('*')
      .eq('student_id', studentId);

    if (error) {
      throw new Error(`Failed to fetch payments: ${error.message}`);
    }
    return data;
  }
}