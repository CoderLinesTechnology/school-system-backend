import { Controller, Post, Body, Get, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { SchoolAdminService } from './school-admin.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateParentDto } from './dto/create-parent.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/admin')
@UseGuards(AuthGuard)
export class SchoolAdminController {
  constructor(private schoolAdminService: SchoolAdminService) {}

  @Post('school')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['super_admin', 'school_admin'])
  async createSchool(@Body() dto: CreateSchoolDto, @Request() req) {
    return this.schoolAdminService.createSchool(dto, req.user);
  }

  @Post('teacher')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['school_admin'])
  async createTeacher(@Body() dto: CreateTeacherDto, @Request() req) {
    return this.schoolAdminService.createTeacher(dto, req.user);
  }

  @Post('student')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['school_admin'])
  async createStudent(@Body() dto: CreateStudentDto, @Request() req) {
    return this.schoolAdminService.createStudent(dto, req.user);
  }

  @Post('parent')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['school_admin'])
  async createParent(@Body() dto: CreateParentDto, @Request() req) {
    return this.schoolAdminService.createParent(dto, req.user);
  }

  @Get('documents')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['school_admin'])
  async getDocuments(@Request() req) {
    return this.schoolAdminService.getDocuments(req.user);
  }

  @Patch('documents/:id/visibility')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['school_admin'])
  async updateDocumentVisibility(@Param('id') id: string, @Body('visibility') visibility: boolean, @Request() req) {
    return this.schoolAdminService.updateDocumentVisibility(id, visibility, req.user);
  }
}