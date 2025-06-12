export class CreateAssessmentDto {
  studentId: string;
  subject: string;
  term: string;
  grade: number;
  classId?: string;
}