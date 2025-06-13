import { Controller, Post, Get, Param, UseGuards, UseInterceptors, UploadedFile, Body, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateDocumentDto } from './dto/document.dto';

@Controller('api/documents')
@UseGuards(JwtAuthGuard)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any, @Body() body: CreateDocumentDto, @Request() req) {
    return this.documentService.upload({
      ...body,
      file,
      uploadedById: req.user.sub,
    });
  }

  @Get('student/:id')
  async getStudentDocuments(@Param('id') studentId: string) {
    return this.documentService.getStudentDocuments(+studentId);
  }

  @Get('class/:id')
  async getClassDocuments(@Param('id') classId: string) {
    return this.documentService.getClassDocuments(+classId);
  }
}