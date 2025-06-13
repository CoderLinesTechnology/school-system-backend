import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateParentDto } from './dto/create-parent.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private supabaseService: SupabaseService) {}

  async createSchool(dto: CreateSchoolDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('schools')
      .insert({ name: dto.name })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create school: ${error.message}`);
    }
    return data;
  }

  async createTeacher(dto: CreateTeacherDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    // First create user
    const { data: user, error: userError } = await this.supabaseService.getClient()
      .from('users')
      .insert({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: 'teacher',
      })
      .select()
      .single();

    if (userError) {
      throw new Error(`Failed to create user: ${userError.message}`);
    }

    // Then create teacher record
    const { data: teacher, error: teacherError } = await this.supabaseService.getClient()
      .from('teachers')
      .insert({
        user_id: user.id,
        school_id: dto.schoolId,
      })
      .select()
      .single();

    if (teacherError) {
      throw new Error(`Failed to create teacher: ${teacherError.message}`);
    }

    return { user, teacher };
  }

  async createStudent(dto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    // First create user
    const { data: user, error: userError } = await this.supabaseService.getClient()
      .from('users')
      .insert({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: 'student',
      })
      .select()
      .single();

    if (userError) {
      throw new Error(`Failed to create user: ${userError.message}`);
    }

    // Then create student record
    const { data: student, error: studentError } = await this.supabaseService.getClient()
      .from('students')
      .insert({
        user_id: user.id,
        class_id: dto.classId,
      })
      .select()
      .single();

    if (studentError) {
      throw new Error(`Failed to create student: ${studentError.message}`);
    }

    return { user, student };
  }

  async createParent(dto: CreateParentDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    // First create user
    const { data: user, error: userError } = await this.supabaseService.getClient()
      .from('users')
      .insert({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: 'parent',
      })
      .select()
      .single();

    if (userError) {
      throw new Error(`Failed to create user: ${userError.message}`);
    }

    // Then create parent record
    const { data: parent, error: parentError } = await this.supabaseService.getClient()
      .from('parents')
      .insert({
        user_id: user.id,
      })
      .select()
      .single();

    if (parentError) {
      throw new Error(`Failed to create parent: ${parentError.message}`);
    }

    return { user, parent };
  }

  async getDocuments() {
    const { data, error } = await this.supabaseService.getClient()
      .from('documents')
      .select(`
        *,
        student:student_id(*),
        class:class_id(*),
        uploaded_by:uploaded_by_id(*)
      `);

    if (error) {
      throw new Error(`Failed to fetch documents: ${error.message}`);
    }
    return data;
  }

  async updateDocumentVisibility(id: number, visibility: boolean) {
    const { data, error } = await this.supabaseService.getClient()
      .from('documents')
      .update({ visibility })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new NotFoundException('Document not found');
    }
    return data;
  }
}