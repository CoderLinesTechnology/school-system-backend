import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document) private documentRepository: Repository<Document>,
  ) {}

  async upload(createDocumentDto: CreateDocumentDto) {
    const { file, studentId, classId, visibility } = createDocumentDto;
    const document = this.documentRepository.create({
      path: file.path,
      studentId,
      classId,
      visibility,
    });
    await this.documentRepository.save(document);
    return document;
  }

  async getStudentDocuments(studentId: string) {
    return this.documentRepository.find({ where: { studentId, visibility: true } });
  }

  async getClassDocuments(classId: string) {
    return this.documentRepository.find({ where: { classId, visibility: true } });
  }

  async updateDocumentVisibility(id: string, update: { visibility: boolean }) {
    await this.documentRepository.update(id, { visibility: update.visibility });
    return this.documentRepository.findOne({ where: { id } });
  }
}