import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/assessments')
@UseGuards(JwtAuthGuard)
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  async createAssessment(@Body() dto: CreateAssessmentDto) {
    return this.assessmentsService.createAssessment(dto);
  }

  @Get('student/:id')
  async getStudentAssessments(@Param('id') studentId: string) {
    return this.assessmentsService.getStudentAssessments(+studentId);
  }

  @Get('class/:id')
  async getClassAssessments(@Param('id') classId: string) {
    return this.assessmentsService.getClassAssessments(+classId);
  }
}