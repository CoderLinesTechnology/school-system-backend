import { IsString, IsInt, IsBoolean, IsEnum, IsOptional } from 'class-validator';
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
  @IsOptional()
  @IsInt()
  studentId?: number;

  @IsOptional()
  @IsInt()
  classId?: number;

  @IsEnum(DocumentType)
  type: DocumentType;

  @IsBoolean()
  visibility: boolean;
}