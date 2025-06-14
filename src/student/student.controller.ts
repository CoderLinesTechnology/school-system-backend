import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/student')
@UseGuards(AuthGuard)
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('profile')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['student'])
  async getProfile(@Request() req) {
    return this.studentService.getProfile(req.user);
  }

  @Get('documents')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['student'])
  async getDocuments(@Request() req) {
    return this.studentService.getDocuments(req.user);
  }

  @Get('assessments')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['student'])
  async getAssessments(@Request() req) {
    return this.studentService.getAssessments(req.user);
  }

  @Get('payments')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['student'])
  async getPayments(@Request() req) {
    return this.studentService.getPayments(req.user);
  }
}