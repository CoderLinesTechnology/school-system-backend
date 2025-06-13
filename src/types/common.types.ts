export interface School {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Student {
  id: number;
  user_id: number;
  school_id: number;
  class_id?: number;
  admission_number?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Teacher {
  id: number;
  user_id: number;
  school_id: number;
  employee_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Parent {
  id: number;
  user_id: number;
  phone?: string;
  address?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Document {
  id: number;
  student_id: number;
  title: string;
  file_path: string;
  file_type: string;
  visibility: boolean;
  uploaded_by_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Assessment {
  id: number;
  student_id: number;
  subject_id: number;
  score: number;
  max_score: number;
  assessment_type: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Class {
  id: number;
  name: string;
  school_id: number;
  teacher_id?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Subject {
  id: number;
  name: string;
  code?: string;
  school_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ParentStudent {
  id: number;
  parent_id: number;
  student_id: number;
  relationship: string;
  created_at: Date;
  updated_at: Date;
}