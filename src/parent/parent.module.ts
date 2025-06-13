import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { Parent } from '../entities/parent.entity';
import { ParentStudent } from '../entities/parent-student.entity';
import { Student } from '../entities/student.entity';
import { Document } from '../entities/document.entity';
import { Assessment } from '../entities/assessment.entity';
import { Payment } from '../entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parent, ParentStudent, Student, Document, Assessment, Payment])],
  providers: [ParentService],
  controllers: [ParentController],
})
export class ParentModule {}