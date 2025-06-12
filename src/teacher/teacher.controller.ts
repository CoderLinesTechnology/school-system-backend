import { Controller, Post, Body, Get, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeacherService } from './teacher.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';
import { CreateAssessmentDto, CreateDocumentDto } from './dto/teacher.dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/teacher')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.TEACHER)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('assessment')
  async createAssessment(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.teacherService.createAssessment(createAssessmentDto);
  }

  @Get('assessment/:student_id')
  async getStudentAssessments(@Param('student_id') studentId: string) {
    return this.teacherService.getStudentAssessments(studentId);
  }

  @Post('documents')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file: any, @Body() body: CreateDocumentDto) {
    return this.teacherService.uploadDocument({ ...body, file });
  }
}