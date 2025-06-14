import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { RecordAttendanceDto } from './dto/record-attendance.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/attendance')
@UseGuards(AuthGuard)
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('record')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['teacher'])
  async recordAttendance(@Body() dto: RecordAttendanceDto, @Request() req) {
    return this.attendanceService.recordAttendance(dto, req.user);
  }

  @Get('student/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['student', 'teacher', 'school_admin', 'parent'])
  async getStudentAttendance(@Param('id') studentId: string, @Request() req) {
    return this.attendanceService.getStudentAttendance(studentId, req.user);
  }

  @Get('class/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['teacher', 'school_admin'])
  async getClassAttendance(@Param('id') classId: string, @Request() req) {
    return this.attendanceService.getClassAttendance(classId, req.user);
  }
}