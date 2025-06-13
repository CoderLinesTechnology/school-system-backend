export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface Payment {
  id: number;
  student_id: number;
  amount: number;
  status: PaymentStatus;
  transaction_reference: string;
  created_at: Date;
  updated_at: Date;
}