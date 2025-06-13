import { IsInt, IsDateString, IsEnum } from 'class-validator';
import { DocumentType } from '../../types/document.types';

export class CreateAttendanceDto {
  @IsInt()
  studentId: number;

  @IsDateString()
  date: string;

  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  recordedById?: number; // Add this to fix errors
}