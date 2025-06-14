import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { DocumentService } from './document.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('api/documents')
@UseGuards(AuthGuard)
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post('upload')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['teacher', 'school_admin'])
  async uploadDocument(@Body() dto: UploadDocumentDto, @Request() req) {
    return this.documentService.uploadDocument(dto, req.user);
  }

  @Get('student/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['student', 'teacher', 'school_admin', 'parent'])
  async getStudentDocuments(@Param('id') studentId: string, @Request() req) {
    return this.documentService.getStudentDocuments(studentId, req.user);
  }

  @Get('class/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['teacher', 'school_admin'])
  async getClassDocuments(@Param('id') classId: string, @Request() req) {
    return this.documentService.getClassDocuments(classId, req.user);
  }
}