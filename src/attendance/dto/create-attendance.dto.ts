import { IsInt, IsString, IsDateString, IsEnum } from 'class-validator';
import { AttendanceStatus } from '../../types/attendance.types'; // Updated import

export class CreateAttendanceDto {
  @IsInt()
  studentId: number;

  @IsInt()
  classId: number;

  @IsDateString()
  date: string;

  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @IsInt()
  recordedById: number;

  @IsString()
  remarks?: string;
}