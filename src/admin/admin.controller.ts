import { Controller, Post, Body, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateParentDto } from './dto/create-parent.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../types/user.types'; // Updated import
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SCHOOL_ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('school')
  async createSchool(@Body() dto: CreateSchoolDto) {
    return this.adminService.createSchool(dto);
  }

  @Post('teacher')
  async createTeacher(@Body() dto: CreateTeacherDto) {
    return this.adminService.createTeacher(dto);
  }

  @Post('student')
  async createStudent(@Body() dto: CreateStudentDto) {
    return this.adminService.createStudent(dto);
  }

  @Post('parent')
  async createParent(@Body() dto: CreateParentDto) {
    return this.adminService.createParent(dto);
  }

  @Get('documents')
  async getDocuments() {
    return this.adminService.getDocuments();
  }

  @Patch('documents/:id/visibility')
  async updateDocumentVisibility(@Param('id') id: string, @Body('visibility') visibility: boolean) {
    return this.adminService.updateDocumentVisibility(+id, visibility);
  }
}