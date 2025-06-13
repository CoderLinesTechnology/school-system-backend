export enum DocumentType {
  REPORT_CARD = 'report_card',
  CERTIFICATE = 'certificate',
  TRANSCRIPT = 'transcript',
  ID_CARD = 'id_card',
  OTHER = 'other',
}

export interface Document {
  id: number;
  student_id: number;
  title: string;
  file_path: string;
  file_type: string;
  document_type: DocumentType;
  visibility: boolean;
  uploaded_by_id: number;
  created_at: Date;
  updated_at: Date;
}