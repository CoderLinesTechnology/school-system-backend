import { IsInt, IsString, IsDateString, IsEnum } from 'class-validator';

export enum AttendanceStatus {
  Present = 'present',
  Absent = 'absent',
  Late = 'late',
}

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