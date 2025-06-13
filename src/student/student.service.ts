import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { Document } from '../entities/document.entity';
import { Assessment } from '../entities/assessment.entity';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Document) private documentRepository: Repository<Document>,
    @InjectRepository(Assessment) private assessmentRepository: Repository<Assessment>,
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
  ) {}

  async getProfile(studentId: number) {
    const student = await this.studentRepository.findOne({
      where: { user: { id: studentId } },
      relations: ['user', 'class'],
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async getDocuments(studentId: number) {
    return this.documentRepository.find({
      where: { student: { id: studentId }, visibility: true },
      relations: ['uploaded_by'],
    });
  }

  async getAssessments(studentId: number) {
    return this.assessmentRepository.find({
      where: { student: { id: studentId } },
      relations: ['subject'],
    });
  }

  async getPayments(studentId: number) {
    return this.paymentRepository.find({
      where: { student: { id: studentId } },
    });
  }
}