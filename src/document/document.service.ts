import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateDocumentDto } from './dto/document.dto';

@Injectable()
export class DocumentService {
  constructor(private supabaseService: SupabaseService) {}

  async upload(dto: CreateDocumentDto & { file: any; uploadedById: number }) {
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

  async getStudentDocuments(studentId: number) {
    const { data, error } = await this.supabaseService.getClient()
      .from('documents')
      .select(`
        *,
        uploaded_by:uploaded_by_id(*)
      `)
      .eq('student_id', studentId)
      .eq('visibility', true);

    if (error) {
      throw new Error(`Failed to fetch documents: ${error.message}`);
    }
    return data;
  }

  async getClassDocuments(classId: number) {
    const { data, error } = await this.supabaseService.getClient()
      .from('documents')
      .select(`
        *,
        uploaded_by:uploaded_by_id(*)
      `)
      .eq('class_id', classId)
      .eq('visibility', true);

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