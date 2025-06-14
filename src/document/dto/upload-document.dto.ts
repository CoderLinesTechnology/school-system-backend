import { IsString, IsIn } from 'class-validator';

export class UploadDocumentDto {
  @IsString()
  studentId: string;

  @IsString()
  classId: string;

  @IsIn(['report', 'receipt', 'assignment'])
  type: string;

  @IsString()
  filename: string;
}