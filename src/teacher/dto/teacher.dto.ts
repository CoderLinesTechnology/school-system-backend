import { IsString, IsInt, IsBoolean, IsEnum } from 'class-validator';
import { DocumentType } from '../../entities/document.entity';

export class CreateAssessmentDto {
  @IsInt()
  studentId: number;

  @IsInt()
  subjectId: number;

  @IsString()
  term: string;

  @IsInt()
  grade: number;
}

export class CreateDocumentDto {
  @IsInt({ optional: true })
  studentId?: number;

  @IsInt({ optional: true })
  classId?: number;

  @IsEnum(DocumentType)
  type: DocumentType;

  @IsBoolean()
  visibility: boolean;
}