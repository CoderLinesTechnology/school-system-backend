import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/student')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.STUDENT)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.studentService.getProfile(req.user.userId);
  }

  @Get('documents')
  async getDocuments(@Request() req) {
    return this.studentService.getDocuments(req.user.userId);
  }

  @Get('assessments')
  async getAssessments(@Request() req) {
    return this.studentService.getAssessments(req.user.userId);
  }
}