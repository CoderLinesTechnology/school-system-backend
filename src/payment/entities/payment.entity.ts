import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  amount: number;

  @Column()
  reference: string;

  @Column()
  documentId: string;

  @Column({ default: 'pending' })
  status: string;
}