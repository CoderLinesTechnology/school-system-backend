import { IsString, IsDateString, IsIn } from 'class-validator';

export class RecordAttendanceDto {
  @IsString()
  studentId: string;

  @IsDateString()
  date: string;

  @IsIn(['present', 'absent'])
  status: string;
}