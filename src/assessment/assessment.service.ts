import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessment } from './entities/assessment.entity';
import { CreateAssessmentDto } from './dto/assessment.dto';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectRepository(Assessment) private assessmentRepository: Repository<Assessment>,
  ) {}

  async createAssessment(createAssessmentDto: CreateAssessmentDto) {
    const assessment = this.assessmentRepository.create(createAssessmentDto);
    await this.assessmentRepository.save(assessment);
    return assessment;
  }

  async getStudentAssessments(studentId: string) {
    return this.assessmentRepository.find({ where: { studentId } });
  }

  async getClassAssessments(classId: string) {
    return this.assessmentRepository.find({ where: { classId } });
  }
}