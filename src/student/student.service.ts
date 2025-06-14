import { Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class StudentService {
  constructor(private supabaseService: SupabaseService) {}

  async getProfile(user: User) {
    if (user.user_metadata.role !== 'student') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('students')
      .select('*, users(*)')
      .eq('user_id', user.id)
      .single();

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async getDocuments(user: User) {
    if (user.user_metadata.role !== 'student') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('documents')
      .select('*')
      .eq('student_id', user.id)
      .eq('visibility', true);

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async getAssessments(user: User) {
    if (user.user_metadata.role !== 'student') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('assessments')
      .select('*')
      .eq('student_id', user.id);

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async getPayments(user: User) {
    if (user.user_metadata.role !== 'student') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('payments')
      .select('*')
      .eq('student_id', user.id);

    if (error) throw new Error(error.message);

    return { success: true, data };
  }
}