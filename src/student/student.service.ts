import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Document } from '../document/entities/document.entity';
import { Assessment } from '../assessment/entities/assessment.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Document) private documentRepository: Repository<Document>,
    @InjectRepository(Assessment) private assessmentRepository: Repository<Assessment>,
  ) {}

  async getProfile(userId: string) {
    return this.userRepository.findOne({ where: { id: userId }, select: ['id', 'name', 'email', 'role', 'schoolId'] });
  }

  async getDocuments(userId: string) {
    return this.documentRepository.find({ where: { studentId: userId, visibility: true } });
  }

  async getAssessments(userId: string) {
    return this.assessmentRepository.find({ where: { studentId: userId } });
  }
}