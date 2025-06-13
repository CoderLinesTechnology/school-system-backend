import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateAssessmentDto {
  @IsInt()
  studentId: number;

  @IsInt()
  subjectId: number;

  @IsNumber()
  score: number;

  @IsString()
  term: string;
}