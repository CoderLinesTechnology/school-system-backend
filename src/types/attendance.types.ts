export enum AttendanceStatus {
  Present = 'present',
  Absent = 'absent',
  Late = 'late',
}

export interface Attendance {
  id: number;
  student_id: number;
  class_id: number;
  date: string;
  status: AttendanceStatus;
  recorded_by_id: number;
  remarks?: string;
  created_at: Date;
  updated_at: Date;
}