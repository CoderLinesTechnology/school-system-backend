import { Multer } from '@nestjs/platform-express';

export class CreateAssessmentDto {
  studentId: string;
  subject: string;
  term: string;
  grade: number;
  classId?: string;
}

export class CreateDocumentDto {
  file: Multer.File;
  studentId?: string;
  classId?: string;
  visibility: boolean;
}