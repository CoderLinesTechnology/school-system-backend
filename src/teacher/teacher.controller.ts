import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/teacher')
@UseGuards(AuthGuard)
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Post('assessment')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['teacher'])
  async createAssessment(@Body() dto: CreateAssessmentDto, @Request() req) {
    return this.teacherService.createAssessment(dto, req.user);
  }

  @Get('assessment/:studentId')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['teacher'])
  async getStudentAssessments(@Param('studentId') studentId: string, @Request() req) {
    return this.teacherService.getStudentAssessments(studentId, req.user);
  }

  @Post('documents')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['teacher'])
  async uploadDocument(
    @Body() dto: { studentId: string; classId: string; type: string; filename: string },
    @Request() req,
  ) {
    return this.teacherService.uploadDocument(dto, req.user);
  }

  @Post('attendance')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['teacher'])
  async recordAttendance(@Body() dto: CreateAttendanceDto, @Request() req) {
    return this.teacherService.recordAttendance(dto, req.user);
  }
}