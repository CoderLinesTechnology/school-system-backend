import { Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateParentDto } from './dto/create-parent.dto';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class SchoolAdminService {
  constructor(private supabaseService: SupabaseService) {}

  async createSchool(dto: CreateSchoolDto, user: User) {
    if (!['super_admin', 'school_admin'].includes(user.user_metadata.role)) {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('schools')
      .insert({ name: dto.name })
      .select()
      .single();

    if (error) throw new Error(error.message);

    await this.supabaseService.client
      .from('school_admins')
      .insert({ user_id: user.id, school_id: data.id });

    return { success: true, data };
  }

  async createTeacher(dto: CreateTeacherDto, user: User) {
    if (user.user_metadata.role !== 'school_admin') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('users')
      .insert({ name: dto.name, email: dto.email, role: 'teacher' })
      .select()
      .single();

    if (error) throw new Error(error.message);

    await this.supabaseService.client
      .from('teachers')
      .insert({ user_id: data.id, school_id: dto.schoolId });

    return { success: true, data };
  }

  async createStudent(dto: CreateStudentDto, user: User) {
    if (user.user_metadata.role !== 'school_admin') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('users')
      .insert({ name: dto.name, email: dto.email, role: 'student' })
      .select()
      .single();

    if (error) throw new Error(error.message);

    await this.supabaseService.client
      .from('students')
      .insert({ user_id: data.id, class_id: dto.classId });

    return { success: true, data };
  }

  async createParent(dto: CreateParentDto, user: User) {
    if (user.user_metadata.role !== 'school_admin') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('users')
      .insert({ name: dto.name, email: dto.email, role: 'parent' })
      .select()
      .single();

    if (error) throw new Error(error.message);

    await this.supabaseService.client
      .from('parents')
      .insert({ user_id: data.id });

    await this.supabaseService.client
      .from('parent_student')
      .insert({ parent_id: data.id, student_id: dto.studentId });

    return { success: true, data };
  }

  async getDocuments(user: User) {
    if (user.user_metadata.role !== 'school_admin') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('documents')
      .select('*');

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async updateDocumentVisibility(id: string, visibility: boolean, user: User) {
    if (user.user_metadata.role !== 'school_admin') {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('documents')
      .update({ visibility })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return { success: true, data };
  }
}