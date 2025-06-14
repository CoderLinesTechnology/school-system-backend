import { IsString, IsNumber } from 'class-validator';

export class CreateAssessmentDto {
  @IsString()
  studentId: string;

  @IsString()
  subjectId: string;

  @IsNumber()
  score: number;

  @IsString()
  term: string;
}