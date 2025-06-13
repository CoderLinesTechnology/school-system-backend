import { IsInt, IsDateString, IsEnum } from 'class-validator';
import { DocumentType } from '../../types/document.types';

// Define the AttendanceStatus enum
export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused'
}

export class CreateAttendanceDto {
  @IsInt()
  studentId: number;

  @IsDateString()
  date: string;

  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  recordedById?: number; // Add this to fix errors
}