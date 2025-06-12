import { Controller, Post, Get, Param, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
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
  async upload(@UploadedFile() file: Express.Multer.File, @Body() body: CreateDocumentDto) {
    return this.documentService.upload({ ...body, file });
  }

  @Get('student/:id')
  async getStudentDocuments(@Param('id') studentId: string) {
    return this.documentService.getStudentDocuments(studentId);
  }

  @Get('class/:id')
  async getClassDocuments(@Param('id') classId: string) {
    return this.documentService.getClassDocuments(classId);
  }
}