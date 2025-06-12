import { Controller, Post, Body, Get, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';
import { CreateSchoolDto, CreateTeacherDto, CreateStudentDto, UpdateDocumentVisibilityDto } from './dto/admin.dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(UserRole.SCHOOL_ADMIN, UserRole.SUPER_ADMIN)
  @Post('school')
  async createSchool(@Body() createSchoolDto: CreateSchoolDto, @Request() req) {
    return this.adminService.createSchool(createSchoolDto, req.user.userId);
  }

  @Roles(UserRole.SCHOOL_ADMIN, UserRole.SUPER_ADMIN)
  @Post('teacher')
  async addTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.adminService.addTeacher(createTeacherDto);
  }

  @Roles(UserRole.SCHOOL_ADMIN, UserRole.SUPER_ADMIN)
  @Post('student')
  async addStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.adminService.addStudent(createStudentDto);
  }

  @Roles(UserRole.SCHOOL_ADMIN, UserRole.SUPER_ADMIN)
  @Get('documents')
  async getDocuments() {
    return this.adminService.getDocuments();
  }

  @Roles(UserRole.SCHOOL_ADMIN, UserRole.SUPER_ADMIN)
  @Patch('documents/:id/visibility')
  async updateDocumentVisibility(@Param('id') id: string, @Body() updateVisibilityDto: UpdateDocumentVisibilityDto) {
    return this.adminService.updateDocumentVisibility(id, updateVisibilityDto);
  }
}