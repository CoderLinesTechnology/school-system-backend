import { Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class ParentService {
  constructor(private supabaseService: SupabaseService) {}

  async getProfile(user: User) {
    if (user.user_metadata.role !== 'parent') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('parents')
      .select('*, users(*)')
      .eq('user_id', user.id)
      .single();

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async getChildren(user: User) {
    if (user.user_metadata.role !== 'parent') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('parent_student')
      .select('students(*, users(*))')
      .eq('parent_id', user.id);

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async getChildAssessments(studentId: string, user: User) {
    if (user.user_metadata.role !== 'parent') {
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

  async getChildDocuments(studentId: string, user: User) {
    if (user.user_metadata.role !== 'parent') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('documents')
      .select('*')
      .eq('student_id', studentId)
      .eq('visibility', true);

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async getChildPayments(studentId: string, user: User) {
    if (user.user_metadata.role !== 'parent') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('payments')
      .select('*')
      .eq('student_id', studentId);

    if (error) throw new Error(error.message);

    return { success: true, data };
  }
}