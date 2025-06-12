import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessment } from '../assessment/entities/assessment.entity';
import { CreateAssessmentDto, CreateDocumentDto } from './dto/teacher.dto';
import { DocumentService } from '../document/document.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Assessment) private assessmentRepository: Repository<Assessment>,
    private documentService: DocumentService,
  ) {}

  async createAssessment(createAssessmentDto: CreateAssessmentDto) {
    const assessment = this.assessmentRepository.create(createAssessmentDto);
    await this.assessmentRepository.save(assessment);
    return assessment;
  }

  async getStudentAssessments(studentId: string) {
    return this.assessmentRepository.find({ where: { studentId } });
  }

  async uploadDocument(createDocumentDto: CreateDocumentDto) {
    return this.documentService.upload(createDocumentDto);
  }
}