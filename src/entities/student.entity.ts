import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { Class } from './class.entity';
import { User } from './user.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  admission_number: string;

  @Index()
  @ManyToOne(() => Class, { nullable: false })
  class: Class;

  @Index()
  @ManyToOne(() => User, { nullable: false })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}