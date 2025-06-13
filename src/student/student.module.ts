import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from '../entities/student.entity';
import { Document } from '../entities/document.entity';
import { Assessment } from '../entities/assessment.entity';
import { Payment } from '../entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Document, Assessment, Payment])],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}