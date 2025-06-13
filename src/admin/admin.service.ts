import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from '../entities/school.entity';
import { Teacher } from '../entities/teacher.entity';
import { Student } from '../entities/student.entity';
import { Parent } from '../entities/parent.entity';
import { Document } from '../entities/document.entity';
import { User, UserRole } from '../entities/user.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateParentDto } from './dto/create-parent.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(School) private schoolRepository: Repository<School>,
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Parent) private parentRepository: Repository<Parent>,
    @InjectRepository(Document) private documentRepository: Repository<Document>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createSchool(dto: CreateSchoolDto) {
    const school = this.schoolRepository.create({ name: dto.name });
    return this.schoolRepository.save(school);
  }

  async createTeacher(dto: CreateTeacherDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: UserRole.TEACHER, // Use enum value
    });
    const savedUser = await this.userRepository.save(user);
    const teacher = this.teacherRepository.create({
      user: savedUser, // Single User entity
      school: { id: dto.schoolId },
    });
    return this.teacherRepository.save(teacher);
  }

  async createStudent(dto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: UserRole.STUDENT, // Use enum value
    });
    const savedUser = await this.userRepository.save(user);
    const student = this.studentRepository.create({
      user: savedUser, // Single User entity
      class: { id: dto.classId },
    });
    return this.studentRepository.save(student);
  }

  async createParent(dto: CreateParentDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: UserRole.PARENT, // Use enum value
    });
    const savedUser = await this.userRepository.save(user);
    const parent = this.parentRepository.create({
      user: savedUser, // Single User entity
    });
    return this.parentRepository.save(parent);
  }

  async getDocuments() {
    return this.documentRepository.find({ relations: ['student', 'class', 'uploaded_by'] });
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