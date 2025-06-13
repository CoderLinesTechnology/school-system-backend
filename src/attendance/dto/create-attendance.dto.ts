import { IsInt, IsDateString, IsEnum } from 'class-validator';
import { AttendanceStatus } from '../../entities/attendance.entity';

export class CreateAttendanceDto {
  @IsInt()
  studentId: number;

  @IsDateString()
  date: string;

  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}