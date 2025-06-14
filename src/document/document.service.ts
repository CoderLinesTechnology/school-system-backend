import { Injectable, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '../common/supabase/supabase.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class DocumentService {
  constructor(private supabaseService: SupabaseService) {}

  async uploadDocument(dto: UploadDocumentDto, user: User) {
    if (!['teacher', 'school_admin'].includes(user.user_metadata.role)) {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('documents')
      .insert({
        student_id: dto.studentId,
        class_id: dto.classId,
        type: dto.type,
        filename: dto.filename,
        uploaded_by: user.id,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async getStudentDocuments(studentId: string, user: User) {
    if (!['student', 'teacher', 'school_admin', 'parent'].includes(user.user_metadata.role)) {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const query = this.supabaseService.client
      .from('documents')
      .select('*')
      .eq('student_id', studentId);

    if (user.user_metadata.role === 'student') {
      query.eq('visibility', true);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    return { success: true, data };
  }

  async getClassDocuments(classId: string, user: User) {
    if (!['teacher', 'school_admin'].includes(user.user_metadata.role)) {
      throw new ForbiddenException({
        success: false,
        message: 'Insufficient permissions',
        error_code: 'AUTH_403',
      });
    }

    const { data, error } = await this.supabaseService.client
      .from('documents')
      .select('*')
      .eq('class_id', classId);

    if (error) throw new Error(error.message);

    return { success: true, data };
  }
}