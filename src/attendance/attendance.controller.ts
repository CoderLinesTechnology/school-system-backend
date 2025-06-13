import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../types/user.types'; // Updated import
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.TEACHER, UserRole.SCHOOL_ADMIN)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('record')
  async recordAttendance(@Body() dto: CreateAttendanceDto, @Request() req) {
    return this.attendanceService.recordAttendance({
      ...dto,
      recordedById: req.user.sub,
    });
  }

  @Get('student/:id')
  async getStudentAttendance(@Param('id') studentId: string) {
    return this.attendanceService.getStudentAttendance(+studentId);
  }

  @Get('class/:id')
  async getClassAttendance(@Param('id') classId: string) {
    return this.attendanceService.getClassAttendance(+classId);
  }
}