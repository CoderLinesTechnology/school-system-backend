import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessment } from '../entities/assessment.entity';
import { CreateAssessmentDto } from './dto/create-assessment.dto';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectRepository(Assessment) private assessmentRepository: Repository<Assessment>,
  ) {}

  async createAssessment(dto: CreateAssessmentDto) {
    const assessment = this.assessmentRepository.create({
      student: { id: dto.studentId },
      subject: { id: dto.subjectId },
      score: dto.score,
      term: dto.term,
    });
    return this.assessmentRepository.save(assessment);
  }

  async getStudentAssessments(studentId: number) {
    return this.assessmentRepository.find({
      where: { student: { id: studentId } },
      relations: ['subject'],
    });
  }

  async getClassAssessments(classId: number) {
    return this.assessmentRepository.find({
      where: { student: { class: { id: classId } } },
      relations: ['student', 'subject'],
    });
  }
}