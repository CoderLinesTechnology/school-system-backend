export class CreateAssessmentDto {
  studentId: string;
  subject: string;
  term: string;
  grade: number;
  classId?: string;
}

export class CreateDocumentDto {
  file: Express.Multer.File;
  studentId?: string;
  classId?: string;
  visibility: boolean;
}