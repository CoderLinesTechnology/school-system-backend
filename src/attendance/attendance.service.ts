import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance) private attendanceRepository: Repository<Attendance>,
  ) {}

  async recordAttendance(dto: CreateAttendanceDto) {
    const attendance = this.attendanceRepository.create({
      student: { id: dto.studentId },
      date: new Date(dto.date),
      status: dto.status,
      recorded_by: { id: dto.recordedById },
    });
    return this.attendanceRepository.save(attendance);
  }

  async getStudentAttendance(studentId: number) {
    return this.attendanceRepository.find({
      where: { student: { id: studentId } },
      relations: ['recorded_by'],
    });
  }

  async getClassAttendance(classId: number) {
    return this.attendanceRepository.find({
      where: { student: { class: { id: classId } } },
      relations: ['student', 'recorded_by'],
    });
  }
}