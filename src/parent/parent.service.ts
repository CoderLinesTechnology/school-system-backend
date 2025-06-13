import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from '../entities/parent.entity';
import { ParentStudent } from '../entities/parent-student.entity';
import { Student } from '../entities/student.entity';
import { Document } from '../entities/document.entity';
import { Assessment } from '../entities/assessment.entity';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent) private parentRepository: Repository<Parent>,
    @InjectRepository(ParentStudent) private parentStudentRepository: Repository<ParentStudent>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Document) private documentRepository: Repository<Document>,
    @InjectRepository(Assessment) private assessmentRepository: Repository<Assessment>,
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
  ) {}

  async getProfile(parentId: number) {
    const parent = await this.parentRepository.findOne({
      where: { user: { id: parentId } },
      relations: ['user'],
    });
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }
    return parent;
  }

  async getChildren(parentId: number) {
    const parentStudents = await this.parentStudentRepository.find({
      where: { parent: { user: { id: parentId } } },
      relations: ['student', 'student.user', 'student.class'],
    });
    return parentStudents.map(ps => ps.student);
  }

  async getChildAssessments(studentId: number, parentId: number) {
    const parentStudent = await this.parentStudentRepository.findOne({
      where: { parent: { user: { id: parentId } }, student: { id: studentId } },
    });
    if (!parentStudent) {
      throw new NotFoundException('Student not linked to parent');
    }
    return this.assessmentRepository.find({
      where: { student: { id: studentId } },
      relations: ['subject'],
    });
  }

  async getChildDocuments(studentId: number, parentId: number) {
    const parentStudent = await this.parentStudentRepository.findOne({
      where: { parent: { user: { id: parentId } }, student: { id: studentId } },
    });
    if (!parentStudent) {
      throw new NotFoundException('Student not linked to parent');
    }
    return this.documentRepository.find({
      where: { student: { id: studentId }, visibility: true },
      relations: ['uploaded_by'],
    });
  }

  async getChildPayments(studentId: number, parentId: number) {
    const parentStudent = await this.parentStudentRepository.findOne({
      where: { parent: { user: { id: parentId } }, student: { id: studentId } },
    });
    if (!parentStudent) {
      throw new NotFoundException('Student not linked to parent');
    }
    return this.paymentRepository.find({
      where: { student: { id: studentId } },
    });
  }
}