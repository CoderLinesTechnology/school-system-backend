import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Assessment } from '../entities/assessment.entity';
import { Document } from '../entities/document.entity';
import { Attendance } from '../entities/attendance.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assessment, Document, Attendance]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(pdf|doc|docx)$/)) {
          cb(new Error('Only PDF and Word files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  ],
  providers: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule {}