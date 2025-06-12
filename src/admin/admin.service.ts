import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { User, UserRole } from '../auth/entities/user.entity';
import { Document } from '../document/entities/document.entity';
import { CreateSchoolDto, CreateTeacherDto, CreateStudentDto, UpdateDocumentVisibilityDto } from './dto/admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(School) private schoolRepository: Repository<School>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Document) private documentRepository: Repository<Document>,
  ) {}

  async createSchool(createSchoolDto: CreateSchoolDto, adminId: string) {
    const school = this.schoolRepository.create({ ...createSchoolDto, adminId });
    await this.schoolRepository.save(school);
    return school;
  }

  async addTeacher(createTeacherDto: CreateTeacherDto) {
    const hashedPassword = await bcrypt.hash(createTeacherDto.password, 10);
    const teacher = this.userRepository.create({
      ...createTeacherDto,
      password: hashedPassword,
      role: UserRole.TEACHER,
    });
    await this.userRepository.save(teacher);
    return teacher;
  }

  async addStudent(createStudentDto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);
    const student = this.userRepository.create({
      ...createStudentDto,
      password: hashedPassword,
      role: UserRole.STUDENT,
    });
    await this.userRepository.save(student);
    return student;
  }

  async getDocuments() {
    return this.documentRepository.find();
  }

  async updateDocumentVisibility(id: string, updateVisibilityDto: UpdateDocumentVisibilityDto) {
    await this.documentRepository.update(id, { visibility: updateVisibilityDto.visibility });
    return this.documentRepository.findOne({ where: { id } });
  }
}