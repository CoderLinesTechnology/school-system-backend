export class CreateDocumentDto {
  file: any; // Changed from Express.Multer.File to any
  studentId?: string;
  classId?: string;
  visibility: boolean;
}