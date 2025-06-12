export class CreateAssessmentDto {
  studentId: string;
  subject: string;
  term: string;
  grade: number;
  classId?: string;
}

export class CreateDocumentDto {
  file: any; // Changed from Express.Multer.File to any
  studentId?: string;
  classId?: string;
  visibility: boolean;
}