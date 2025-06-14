import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/assessments')
@UseGuards(AuthGuard)
export class AssessmentController {
  constructor(private assessmentService: AssessmentService) {}

  @Post()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['teacher'])
  async createAssessment(@Body() dto: CreateAssessmentDto, @Request() req) {
    return this.assessmentService.createAssessment(dto, req.user);
  }

  @Get('student/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['student', 'teacher', 'school_admin', 'parent'])
  async getStudentAssessments(@Param('id') studentId: string, @Request() req) {
    return this.assessmentService.getStudentAssessments(studentId, req.user);
  }

  @Get('class/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['teacher', 'school_admin'])
  async getClassAssessments(@Param('id') classId: string, @Request() req) {
    return this.assessmentService.getClassAssessments(classId, req.user);
  }
}