import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAssessmentDto } from './dto/assessment.dto';

@Controller('api/assessments')
@UseGuards(JwtAuthGuard)
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  async createAssessment(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentService.createAssessment(createAssessmentDto);
  }

  @Get('student/:id')
  async getStudentAssessments(@Param('id') studentId: string) {
    return this.assessmentService.getStudentAssessments(studentId);
  }

  @Get('class/:id')
  async getClassAssessments(@Param('id') classId: string) {
    return this.assessmentService.getClassAssessments(classId);
  }
}