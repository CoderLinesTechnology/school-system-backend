import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../entities/document.entity';
import { CreateDocumentDto } from './dto/document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document) private documentRepository: Repository<Document>,
  ) {}

  async upload(dto: CreateDocumentDto) {
    const document = this.documentRepository.create({
      student: dto.studentId ? { id: dto.studentId } : null,
      class: dto.classId ? { id: dto.classId } : null,
      type: dto.type,
      filename: dto.file.filename,
      uploaded_by: { id: dto.uploadedById },
      visibility: dto.visibility,
    });
    return this.documentRepository.save(document);
  }

  async getStudentDocuments(studentId: number) {
    return this.documentRepository.find({
      where: { student: { id: studentId }, visibility: true },
      relations: ['uploaded_by'],
    });
  }

  async getClassDocuments(classId: number) {
    return this.documentRepository.find({
      where: { class: { id: classId }, visibility: true },
      relations: ['uploaded_by'],
    });
  }

  async updateDocumentVisibility(id: number, visibility: boolean) {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    document.visibility = visibility;
    return this.documentRepository.save(document);
  }
}