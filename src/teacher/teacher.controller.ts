import { Controller, Post, Body, Get, Param, UseGuards, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeacherService } from './teacher.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { RolesGuard } from '../auth/roles.guard';
import { CreateAssessmentDto, CreateDocumentDto } from './dto/teacher.dto';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('api/teacher')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.TEACHER)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('assessment')
  async createAssessment(@Body() dto: CreateAssessmentDto) {
    return this.teacherService.createAssessment(dto);
  }

  @Get('assessment/:student_id')
  async getStudentAssessments(@Param('student_id') studentId: string) {
    return this.teacherService.getStudentAssessments(+studentId);
  }

  @Post('documents')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: any,
    @Body() body: CreateDocumentDto,
    @Request() req,
  ) {
    return this.teacherService.uploadDocument({
      ...body,
      uploadedById: req.user.sub,
      file,
    });
  }

  @Post('attendance')
  async recordAttendance(@Body() dto: CreateAttendanceDto, @Request() req) {
    return this.teacherService.recordAttendance({
      ...dto,
      recordedById: req.user.sub,
    });
  }
}