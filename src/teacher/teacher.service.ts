import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessment } from '../entities/assessment.entity';
import { Document } from '../entities/document.entity';
import { Attendance } from '../entities/attendance.entity';
import { CreateAssessmentDto, CreateDocumentDto } from './dto/teacher.dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Assessment) private assessmentRepository: Repository<Assessment>,
    @InjectRepository(Document) private documentRepository: Repository<Document>,
    @InjectRepository(Attendance) private attendanceRepository: Repository<Attendance>,
  ) {}

  async createAssessment(dto: CreateAssessmentDto) {
    const assessment = this.assessmentRepository.create({
      student: { id: dto.studentId },
      subject: { id: dto.subjectId },
      score: dto.grade,
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

  async uploadDocument(dto: CreateDocumentDto & { file: any; uploadedById: number }) {
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

  async recordAttendance(dto: CreateAttendanceDto) {
    const attendance = this.attendanceRepository.create({
      student: { id: dto.studentId },
      date: new Date(dto.date),
      status: dto.status,
      recorded_by: { id: dto.recordedById },
    });
    return this.attendanceRepository.save(attendance);
  }
}