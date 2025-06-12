export class CreateDocumentDto {
  file: Express.Multer.File;
  studentId?: string;
  classId?: string;
  visibility: boolean;
}